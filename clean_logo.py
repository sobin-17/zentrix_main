import sys
from PIL import Image

def clean_and_crop(input_path, output_path):
    print(f"Cleaning {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Clean the alpha channel (thresholding to remove faint box)
    data = img.getdata()
    new_data = []
    
    # Threshold for alpha. Anything below this becomes fully transparent.
    THRESHOLD = 30
    
    for r, g, b, a in data:
        if a < THRESHOLD:
            new_data.append((0, 0, 0, 0))
        else:
            # Rescale alpha to preserve smooth edges
            new_a = int((a - THRESHOLD) * 255 / (255 - THRESHOLD))
            new_data.append((r, g, b, new_a))
            
    img.putdata(new_data)
    
    # 2. Trim/Crop
    # getbbox() finds the bounding box of the non-zero alpha pixels
    bbox = img.getbbox()
    if bbox:
        print(f"Cropping to {bbox}...")
        img = img.crop(bbox)
    else:
        print("Warning: Image is fully transparent!")
        
    img.save(output_path, "PNG")
    print(f"Saved cleaned and cropped image to {output_path}")

if __name__ == "__main__":
    clean_and_crop("public/logo5_transparent.png", "public/logo5_transparent.png")
