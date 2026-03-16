import { LostPetCDto } from "src/core/interfaces/lost-pets.interface";
import { generateMapboxImage } from "src/core/utils/utils";

export const generateLostedPetTemplate = (losted: LostPetCDto): string => {
    const imageUrl = generateMapboxImage(losted.location);
    return `
    
    <div style="font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;">
        
    <table width="100%" style="max-width:600px;margin:auto;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e5e5;">
        
        <tr>
            <td style="background:#e63946;color:white;padding:20px;text-align:center;">
                <h1 style="margin:0;">🐾 PetRadar</h1>
                <p style="margin:5px 0 0 0;">Mascota perdida</p>
            </td>
        </tr>

        <tr>
            <td style="padding:20px;">

                <h2 style="color:#333;">Se ha reportado una mascota perdida</h2>

                <p style="color:#555;">
                Una persona ha reportado la pérdida de su mascota. Si tienes información o la has visto, 
                por favor contacta al dueño utilizando la información proporcionada.
                </p>

                <div style="text-align:center;margin:20px 0;">
                    <h3 style="color:#333;margin-bottom:10px;">Última ubicación reportada</h3>
                    <img 
                        src="${imageUrl}" 
                        alt="Ubicación de la mascota perdida"
                        style="width:100%;max-width:500px;border-radius:6px;border:1px solid #ddd;"
                    />
                </div>

                ${
                losted.photo_url
                    ? `<div style="text-align:center;margin:20px 0;">
                        <img src="${losted.photo_url}" alt="Mascota perdida" style="max-width:100%;border-radius:6px;">
                    </div>`
                    : ""
                }

                <table width="100%" style="border-collapse:collapse;margin-top:15px;">

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Especie</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.species}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Raza</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.breed ?? "No identificada"}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Color</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.color}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Tamaño</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.size}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Descripción</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.description}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Última dirección vista</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.address}</td>
                    </tr>

                </table>

                <h3 style="margin-top:25px;color:#333;">Información del dueño</h3>

                <table width="100%" style="border-collapse:collapse;">

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Nombre</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.owner_name}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Email</strong></td>
                        <td style="padding:8px;border-bottom:1px solid #eee;">${losted.owner_email}</td>
                    </tr>

                    <tr>
                        <td style="padding:8px;"><strong>Teléfono</strong></td>
                        <td style="padding:8px;">${losted.owner_phone}</td>
                    </tr>

                </table>

            </td>
        </  <td style="background:#f0f0f0;text-align:center;padding:15px;font-size:12px;color:#777;">
                Este mensaje fue generado automáticamente por PetRadar
            </td>
        </tr>

    </table>

    </div>tr>

        <tr>
        
    `
}