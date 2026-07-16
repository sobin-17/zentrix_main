from PIL import Image
import sys

try:
    img = Image.open('public/logo5_transparent.png')
    print("Mode:", img.mode)
    
    # If mode is RGBA, check if any pixel has alpha < 255
    if 'A' in img.mode:
        data = img.getdata()
        transparent_pixels = sum(1 for p in data if p[3] < 255)
        print("Transparent pixels:", transparent_pixels)
        if transparent_pixels == 0:
            print("Image has alpha channel but NO transparent pixels.")
        else:
            print("Image has transparent pixels.")
            
    # Check if there are black pixels
    if img.mode == 'RGBA':
        black_pixels = sum(1 for p in data if p[0] < 10 and p[1] < 10 and p[2] < 10 and p[3] > 250)
    else:
        img_rgb = img.convert('RGB')
        data_rgb = img_rgb.getdata()
        black_pixels = sum(1 for p in data_rgb if p[0] < 10 and p[1] < 10 and p[2] < 10)
        
    print("Near-black opaque pixels:", black_pixels)

except Exception as e:
    print("Error:", str(e))
