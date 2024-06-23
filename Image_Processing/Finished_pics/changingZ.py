import os
import shutil

folder_path = "./With_arrows"
os.chdir('C:/Users/raviv/OneDrive/Desktop/ChangingZCoordinate/Finished_pics/Finished_pics')
current_directory = os.getcwd()


for file_name in os.listdir(folder_path):

    img_file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(img_file_path):
        base_name, extension = os.path.splitext(file_name)
        parts = base_name.split("_")
        node_id = parts[0]
        parts[3] = str(int(parts[3]) * 40)
        z_coord = parts[3]
        print(z_coord)
        new_filename = "_".join(parts) + extension
        new_file_path = os.path.join("./With_arrows", new_filename)

        try:
            # Move the file to the new path
            shutil.move(img_file_path, new_file_path)
            print(f"File '{file_name}' successfully saved as '{new_filename}'")
        except Exception as e:
            print(f"Error: Unable to save file '{file_name}' - {e}")
