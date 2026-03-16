import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { FoundPetCDto } from "src/core/interfaces/found-pets.interface";
import { generateMapboxImage } from "src/core/utils/utils";

export const generateFoundedPetTemplate = (founded: FoundPetCDto): string =>{
    
    const imageUrl = generateMapboxImage(founded.location);
    return `
            <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;">
    
    <table width="100%" style="max-width:600px;margin:auto;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
        
        <tr>
        <td style="background:#2b7cff;color:white;padding:20px;text-align:center;">
            <h1 style="margin:0;">🐾 PetRadar</h1>
            <p style="margin:5px 0 0 0;">Mascota encontrada</p>
        </td>
        </tr>

        <tr>
        <td style="padding:20px;">

            <h2 style="color:#333;">Se ha encontrado una mascota</h2>

            <p style="color:#555;">
            Una persona ha reportado una mascota encontrada que podría coincidir con alguna mascota perdida.
            </p>

            <div style="text-align:center;margin:20px 0;">
    <h3 style="color:#333;margin-bottom:10px;">Ubicación donde fue encontrada</h3>
    <img 
        src="${imageUrl}" 
        alt="Ubicación de la mascota encontrada"
        style="width:100%;max-width:500px;border-radius:6px;border:1px solid #ddd;"
    />
    </div>

            ${
            founded.photo_url
                ? `<div style="text-align:center;margin:20px 0;">
                    <img src="${founded.photo_url}" alt="Mascota encontrada" style="max-width:100%;border-radius:6px;">
                </div>`
                : ""
            }

            <table width="100%" style="border-collapse:collapse;margin-top:15px;">

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Especie</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.species}</td>
            </tr>

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Raza</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.breed ?? "No identificada"}</td>
            </tr>

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Color</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.color}</td>
            </tr>

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Tamaño</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.size}</td>
            </tr>

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Descripción</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.description}</td>
            </tr>

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Dirección</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.address}</td>
            </tr>

            </table>

            <h3 style="margin-top:25px;color:#333;">Información de contacto</h3>

            <table width="100%" style="border-collapse:collapse;">

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Nombre</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.finder_name}</td>
            </tr>

            <tr>
                <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Email</strong></td>
                <td style="padding:8px;border-bottom:1px solid #eee;">${founded.finder_email}</td>
            </tr>

            <tr>
                <td style="padding:8px;"><strong>Teléfono</strong></td>
                <td style="padding:8px;">${founded.finder_phone}</td>
            </tr>

            </table>

        </td>
        </tr>

    </table>

    </div>
            `
}