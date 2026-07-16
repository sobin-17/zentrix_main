from PIL import Image

def remove_dark_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        # Calculate a pseudo-luminance
        lum = r * 0.299 + g * 0.587 + b * 0.114
        
        # If very dark, make transparent
        if lum < 5:
            newData.append((r, g, b, 0))
        # Soft transition for anti-aliasing (lum between 5 and 20)
        elif lum < 20:
            # Map lum 5->0 alpha, lum 20->255 alpha
            alpha = int(((lum - 5) / 15.0) * 255)
            newData.append((r, g, b, alpha))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_dark_background("public/logo4.png", "public/logo4_transparent.png")
