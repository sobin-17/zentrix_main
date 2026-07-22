import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Shield,
  Trash2,
  Lock,
  Mail,
  User,
  KeyRound,
  Pencil,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import {
  getAdmins,
  createAdminAccount,
  deleteAdminAccount,
  updateCurrentAdminPassword,
  updateOtherAdminAccount,
} from "../services/adminService";
import { auth } from "../firebase";

const AdminsManager = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal controls
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null); // null = self, or target admin object

  // Add Admin form state
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [showAddPass, setShowAddPass] = useState(false);

  // Security / Edit Credentials form state
  const [securityForm, setSecurityForm] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    newEmail: "",
  });
  const [secLoading, setSecLoading] = useState(false);
  const [secSuccess, setSecSuccess] = useState("");
  const [secError, setSecError] = useState("");
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const currentUser = auth.currentUser;

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAdmins();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setAddError("");

    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      return setAddError("Please fill in all required fields.");
    }
    if (newAdmin.password.length < 6) {
      return setAddError("Password must be at least 6 characters long.");
    }
    if (newAdmin.password !== newAdmin.confirmPassword) {
      return setAddError("Passwords do not match.");
    }

    try {
      setAddLoading(true);
      await createAdminAccount({
        name: newAdmin.name,
        email: newAdmin.email,
        password: newAdmin.password,
      });

      setNewAdmin({ name: "", email: "", password: "", confirmPassword: "" });
      setShowAddModal(false);
      await loadAdmins();
      alert("New Admin account created successfully!");
    } catch (err) {
      console.error(err);
      setAddError(err.message.replace("Firebase:", "").trim());
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminItem) => {
    if (currentUser && currentUser.email === adminItem.email) {
      return alert("You cannot delete your own currently active admin account!");
    }

    if (
      !window.confirm(
        `Are you sure you want to remove ${adminItem.name || adminItem.email} as an admin?`
      )
    ) {
      return;
    }

    try {
      await deleteAdminAccount(adminItem.firestoreId);
      setAdmins((prev) =>
        prev.filter((a) => a.firestoreId !== adminItem.firestoreId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove admin account.");
    }
  };

  const isEditingSelf =
    !editingAdmin || (currentUser && currentUser.email === editingAdmin.email);

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();
    setSecError("");
    setSecSuccess("");

    if (isEditingSelf) {
      // Self account update: requires old password for re-authentication
      if (!securityForm.oldPassword) {
        return setSecError("Please enter your current Old Password to authenticate.");
      }

      if (securityForm.newPassword) {
        if (securityForm.newPassword.length < 6) {
          return setSecError("New Password must be at least 6 characters long.");
        }
        if (securityForm.newPassword !== securityForm.confirmNewPassword) {
          return setSecError("New passwords do not match.");
        }
      }

      try {
        setSecLoading(true);
        await updateCurrentAdminPassword({
          oldPassword: securityForm.oldPassword,
          newPassword: securityForm.newPassword,
          newEmail: securityForm.newEmail,
        });

        setSecSuccess("Credentials updated successfully!");
        setSecurityForm({
          name: "",
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          newEmail: "",
        });
        await loadAdmins();
        setTimeout(() => setShowEditModal(false), 1500);
      } catch (err) {
        console.error("Firebase auth re-authentication error:", err);
        if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
          setSecError(`Incorrect Old Password for ${currentUser?.email || 'admin'}! Please double-check your current login password.`);
        } else if (err.code === "auth/requires-recent-login") {
          setSecError("Session expired. Please log out and log back in before updating credentials.");
        } else {
          setSecError(err.message ? `${err.message.replace("Firebase:", "").trim()}` : "Failed to update credentials.");
        }
      } finally {
        setSecLoading(false);
      }
    } else {
      // Other admin account update (Name / Email details)
      try {
        setSecLoading(true);
        await updateOtherAdminAccount({
          adminId: editingAdmin.firestoreId,
          name: securityForm.name,
          email: securityForm.newEmail,
        });

        setSecSuccess(`Admin account for ${editingAdmin.name || editingAdmin.email} updated!`);
        await loadAdmins();
        setTimeout(() => setShowEditModal(false), 1500);
      } catch (err) {
        console.error(err);
        setSecError(err.message ? err.message.replace("Firebase:", "").trim() : "Failed to update admin account.");
      } finally {
        setSecLoading(false);
      }
    }
  };

  const openEditModal = (targetAdminItem = null) => {
    setSecError("");
    setSecSuccess("");
    setEditingAdmin(targetAdminItem);

    if (targetAdminItem && currentUser && currentUser.email !== targetAdminItem.email) {
      // Editing another admin: prefill their current name and email
      setSecurityForm({
        name: targetAdminItem.name || "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        newEmail: targetAdminItem.email || "",
      });
    } else {
      // Editing own logged in account
      setSecurityForm({
        name: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        newEmail: "",
      });
    }

    setShowEditModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-400" />
            Admin Account Management
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Manage admin users, add new administrators, and update security credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openEditModal(null)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 font-semibold text-xs border border-purple-500/30 transition-all cursor-pointer"
          >
            <Pencil className="w-4 h-4 text-purple-400" />
            Edit My Email & Password
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(157,0,255,0.3)] cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Add New Admin
          </button>
        </div>
      </div>

      {/* Main Full-width Registered Admins List */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Active Administrators</h3>
            <p className="text-slate-400 text-xs mt-0.5">
              {admins.length} registered admin accounts in system
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Admin User</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
                    Loading admin accounts...
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No admin accounts found.
                  </td>
                </tr>
              ) : (
                admins.map((adm) => {
                  const isSelf = currentUser && currentUser.email === adm.email;

                  return (
                    <tr key={adm.firestoreId || adm.uid} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-purple-600/20 text-purple-300 font-bold flex items-center justify-center text-xs border border-purple-500/30">
                            {(adm.name || adm.email || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm flex items-center gap-2">
                              {adm.name || 'Admin User'}
                              {isSelf && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  You (Current)
                                </span>
                              )}
                            </p>
                            <p className="text-slate-500 text-[11px]">
                              Added {adm.createdAt ? new Date(adm.createdAt).toLocaleDateString() : 'System'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-300 font-mono text-xs">
                        {adm.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {adm.role || 'Admin'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Edit Pencil Icon Button - Only for logged-in admin */}
                          {isSelf && (
                            <button
                              onClick={() => openEditModal(adm)}
                              className="p-2 rounded-lg bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 hover:text-purple-300 transition-colors cursor-pointer"
                              title="Edit My Email & Password"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete Trash Button */}
                          <button
                            disabled={isSelf}
                            onClick={() => handleDeleteAdmin(adm)}
                            className={`p-2 rounded-lg transition-colors ${
                              isSelf
                                ? 'opacity-30 cursor-not-allowed text-slate-600 bg-white/5'
                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 cursor-pointer'
                            }`}
                            title={isSelf ? "You cannot delete yourself" : "Remove Admin"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Email & Password Security Modal (Opens via Edit Pencil Icon) */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-400" />
                {isEditingSelf
                  ? "Change Email & Password"
                  : `Edit Admin (${editingAdmin?.name || editingAdmin?.email || "User"})`}
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                {isEditingSelf
                  ? "Re-authenticate with your Old Password to update your credentials."
                  : `Update account profile details for ${editingAdmin?.name || editingAdmin?.email}.`}
              </p>
            </div>

            {secSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{secSuccess}</span>
              </div>
            )}

            {secError && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{secError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateSecurity} autoComplete="off" className="space-y-4">
              {/* Chrome/Edge autofill decoy fields */}
              <input type="text" name="decoy_username" style={{ display: 'none' }} tabIndex={-1} />
              <input type="password" name="decoy_password" style={{ display: 'none' }} tabIndex={-1} />

              {/* Target Admin Email display */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {isEditingSelf ? "Current Logged In Email" : "Target Admin Email"}
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono">
                  <Mail className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span>
                    {isEditingSelf
                      ? currentUser?.email || "admin@zentrix.com"
                      : editingAdmin?.email || "admin@zentrix.com"}
                  </span>
                </div>
              </div>

              {!isEditingSelf && (
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Admin Full Name
                  </label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3">
                    <User className="w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      name="target_admin_name"
                      value={securityForm.name}
                      onChange={(e) =>
                        setSecurityForm({ ...securityForm, name: e.target.value })
                      }
                      placeholder="Admin full name"
                      className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                    />
                  </div>
                </div>
              )}

              {/* If editing SELF: require Old Password */}
              {isEditingSelf && (
                <>
                  <div>
                    <label className="text-xs font-bold text-purple-300 block mb-1">
                      Enter Old Password * (Required)
                    </label>
                    <div className="flex items-center bg-white/5 border border-purple-500/40 rounded-xl px-3 focus-within:border-purple-500 transition-colors">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <input
                        type={showOldPass ? "text" : "password"}
                        name="current_password_input"
                        required
                        autoComplete="new-password"
                        value={securityForm.oldPassword}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, oldPassword: e.target.value })
                        }
                        placeholder="Enter current password"
                        className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <hr className="border-white/10 my-2" />

                  {/* New Password */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      New Password
                    </label>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 focus-within:border-purple-500 transition-colors">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <input
                        type={showNewPass ? "text" : "password"}
                        name="new_password_input"
                        autoComplete="new-password"
                        value={securityForm.newPassword}
                        onChange={(e) =>
                          setSecurityForm({ ...securityForm, newPassword: e.target.value })
                        }
                        placeholder="Enter new password (min 6 chars)"
                        className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Confirm New Password
                    </label>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 focus-within:border-purple-500 transition-colors">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <input
                        type="password"
                        name="confirm_password_input"
                        autoComplete="new-password"
                        value={securityForm.confirmNewPassword}
                        onChange={(e) =>
                          setSecurityForm({
                            ...securityForm,
                            confirmNewPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm new password"
                        className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Address Update input */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {isEditingSelf ? "Update Email Address (Optional)" : "Admin Email Address"}
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 focus-within:border-purple-500 transition-colors">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <input
                    type="email"
                    name="new_email_input"
                    autoComplete="off"
                    value={securityForm.newEmail}
                    onChange={(e) =>
                      setSecurityForm({ ...securityForm, newEmail: e.target.value })
                    }
                    placeholder="Email address"
                    className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={secLoading}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(157,0,255,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {secLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    isEditingSelf ? "Update Credentials" : "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-400" />
                Add New Admin Account
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Create a new administrator credential for Zentrix Dashboard.
              </p>
            </div>

            {addError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Full Name *
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3">
                  <User className="w-4 h-4 text-purple-400" />
                  <input
                    type="text"
                    required
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Admin Email *
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <input
                    type="email"
                    required
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                    placeholder="admin@zentrixtechnology.com"
                    className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Password *
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <input
                    type={showAddPass ? "text" : "password"}
                    required
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    placeholder="Minimum 6 characters"
                    className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAddPass(!showAddPass)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showAddPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Confirm Password *
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3">
                  <Lock className="w-4 h-4 text-purple-400" />
                  <input
                    type="password"
                    required
                    value={newAdmin.confirmPassword}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm password"
                    className="w-full bg-transparent outline-none px-2.5 py-2.5 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(157,0,255,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {addLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Admin"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminsManager;
