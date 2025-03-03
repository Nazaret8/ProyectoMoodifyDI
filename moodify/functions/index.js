// Importa las funciones necesarias de Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

// Inicializa Firebase Admin SDK
admin.initializeApp();

// Configura la clave API de SendGrid
sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); // Reemplaza con tu clave de API de SendGrid

// Función para enviar correo después de agregar un mensaje a Firestore
exports.sendContactFormResponse = functions.firestore
  .document('contactMessages/{messageId}') // Se ejecuta cada vez que se agrega un mensaje
  .onCreate(async (snapshot, context) => {
    const message = snapshot.data();
    const email = message.email; // Email del usuario que completó el formulario

    // Crea el mensaje que será enviado
    const msg = {
      to: email, // Correo electrónico del usuario
      from: 'nazaretatalasianandrades@gmail.com', // Tu correo electrónico
      subject: 'Gracias por ponerte en contacto con nosotros',
      text: `Hola ${message.firstName},\n\nGracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos pronto. Tu mensaje: ${message.message}`,
      html: `<p>Hola ${message.firstName},</p><p>Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos pronto.</p><p><strong>Tu mensaje:</strong> ${message.message}</p>`,
    };

    try {
      // Envía el correo utilizando SendGrid
      await sgMail.send(msg);
      console.log('Correo enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  });
