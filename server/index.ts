import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const bookings: Record<string, string[]> = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.get("/api/reservation/slots", (req, res) => {
  const fecha = req.query.fecha as string;
  if (!fecha) {
    return res.status(400).json({ error: "Fecha requerida" });
  }
  const booked = bookings[fecha] || [];
  res.json({ fecha, booked });
});

app.post("/api/reservation", async (req, res) => {
  const { fecha, hora, personas, nombre, telefono, comentarios } = req.body;

  if (!fecha || !hora || !personas || !nombre || !telefono) {
    return res.status(400).json({ message: "Todos los campos obligatorios deben completarse." });
  }

  if (!bookings[fecha]) {
    bookings[fecha] = [];
  }

  if (bookings[fecha].includes(hora)) {
    return res.status(409).json({ message: "Ese horario ya no está disponible. Por favor, elige otro." });
  }

  bookings[fecha].push(hora);

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `Nueva reserva — Dichoso — ${nombre}`,
        html: `
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <style>
              body { margin: 0; padding: 0; background-color: #1C1C1C; font-family: 'Inter', Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
              .header { text-align: center; padding: 32px 0; border-bottom: 1px solid #D4AF37; margin-bottom: 32px; }
              .header h1 { font-family: 'Playfair Display', Georgia, serif; color: #D4AF37; font-size: 32px; margin: 0; letter-spacing: 4px; }
              .details { background-color: #252525; padding: 24px; margin-bottom: 16px; }
              .details p { margin: 8px 0; color: #9CA3AF; font-size: 14px; line-height: 1.6; }
              .details strong { color: #F5F0EB; }
              .footer { text-align: center; padding-top: 32px; border-top: 1px solid #333; margin-top: 32px; }
              .footer p { color: #6B7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>DICHOSO</h1>
              </div>
              <div class="details">
                <p><strong>Cliente:</strong> ${nombre}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Fecha:</strong> ${fecha}</p>
                <p><strong>Hora:</strong> ${hora}</p>
                <p><strong>Personas:</strong> ${personas}</p>
                ${comentarios ? `<p><strong>Comentarios:</strong> ${comentarios}</p>` : ""}
              </div>
              <div class="footer">
                <p>Dichoso · Mairena del Aljarafe · Sevilla</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  res.json({ message: "Reserva confirmada" });
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Dichoso server running on port ${PORT}`);
});
