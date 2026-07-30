//==================================================
// SH GLOBAL TECHNOLOGY
// Cloudinary Configuration
//==================================================

export const cloudName = "ywxg2gao";
export const uploadPreset = "Shgobalbd";

export async function uploadToCloudinary(file) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return data.secure_url;
}
