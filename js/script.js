  // Plantilla actualizada con el nuevo formato
  const plantilla = [
    {
        titulo: "1. Bienvenida (2 minutos)",
        contenido: "Saludo inicial."
    },
    {
        titulo: "2. Repaso (5 minutos)",
        contenido: "Revisión de la sesión anterior y aclaración de dudas.\n{{RESPASO_PUNTO1}}\n{{RESPASO_PUNTO2}}\n{{RESPASO_PUNTO3}}\n{{RESPASO_PUNTO4}}\n{{RESPASO_PUNTO5}}\n{{RESPASO_EJEMPLO_PERSONAL}}"
    },
    {
        titulo: "3. Hoy veremos (2 minutos)",
        contenido: "Índice claro de los objetivos de la sesión.\n{{HOY_VEREMOS_PUNTO1}}\n{{HOY_VEREMOS_PUNTO2}}\n{{HOY_VEREMOS_PUNTO3}}\n{{HOY_VEREMOS_PUNTO4}}\n{{HOY_VEREMOS_PUNTO5}}\n{{HOY_VEREMOS_PUNTO6}}"
    },
    {
        titulo: "4. Historia de hoy (20 minutos)",
        contenido: "El componente principal con TPRS:\n{{HISTORIA}}\n{{PREGUNTA_CIRCULAR1}}\n{{PREGUNTA_CIRCULAR2}}\n{{PREGUNTA_CIRCULAR3}}\n{{PREGUNTA_CIRCULAR4}}\n{{PREGUNTA_CIRCULAR5}}\n{{PREGUNTA_CIRCULAR6}}\n{{PREGUNTA_CIRCULAR7}}\n{{JUEGO_DE_ROL_TITULO}}\n{{JUEGO_DE_ROL}}"
    },
    {
        titulo: "5. Lectura corta (8 minutos)",
        contenido: "Refuerzo a través de:\n{{LECTURA_CORTA}}\n\nPreguntas de comprensión:\n{{LECTURA_CORTA_PREGUNTA1}}\n{{LECTURA_CORTA_PREGUNTA2}}\n{{LECTURA_CORTA_PREGUNTA3}}\n{{LECTURA_CORTA_PREGUNTA4}}\n{{LECTURA_CORTA_PREGUNTA5}}\n{{LECTURA_CORTA_PREGUNTA6}}\n{{LECTURA_CORTA_PREGUNTA7}}\n\nPreguntas personalizadas:\n{{LECTURA_CORTA_PREGUNTA_PERSONAL1}}\n{{LECTURA_CORTA_PREGUNTA_PERSONAL2}}\n{{LECTURA_CORTA_PREGUNTA_PERSONAL3}}\n{{LECTURA_CORTA_PREGUNTA_PERSONAL4}}\n{{LECTURA_CORTA_PREGUNTA_PERSONAL5}}\n{{LECTURA_CORTA_PREGUNTA_PERSONAL6}}\n{{LECTURA_CORTA_PREGUNTA_PERSONAL7}}"
    },
    {
        titulo: "6. Resumen (3 minutos)",
        contenido: "Síntesis de los puntos clave aprendidos.\n{{RESUMEN_DE_SESION}}"
    },
    {
        titulo: "7. Tarea (5 minutos)",
        contenido: "Asignación ligera y adelanto de la próxima sesión.\n{{TAREA_TITULO}}\n{{TAREA_INSTRUCCIONES}}\n{{TAREA_PUNTO1}}\n{{TAREA_PUNTO2}}\n{{TAREA_PUNTO3}}\n{{TAREA_PUNTO4}}\n{{TAREA_PUNTO5}}"
    }
];

// Función para resaltar marcadores
function resaltarMarcadores(texto) {
    return texto.replace(/{{([^}]+)}}/g, '<span class="marker">{{$1}}</span>');
}

// Función para cargar la plantilla inicial
function cargarPlantilla() {
    const container = document.getElementById('contenido-plantilla');
    container.innerHTML = '';

    // Para cada diapositiva en la plantilla
    plantilla.forEach((slide) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.id = 'slide-' + slide.titulo.replace(/[^a-zA-Z0-9]/g, '-');

        const titleDiv = document.createElement('div');
        titleDiv.className = 'slide-title';
        titleDiv.innerHTML = resaltarMarcadores(slide.titulo);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'slide-content';
        contentDiv.innerHTML = resaltarMarcadores(slide.contenido).replace(/\n/g, '<br>');

        slideDiv.appendChild(titleDiv);
        slideDiv.appendChild(contentDiv);
        container.appendChild(slideDiv);
    });
}

// Función para copiar el contenido del JSON al portapapeles
function copiarJSON() {
    const jsonTextarea = document.getElementById('jsonInput');
    jsonTextarea.select();
    document.execCommand('copy');
    alert('JSON copiado al portapapeles');
}

// Función para aplicar el JSON a la plantilla
function aplicarJSON() {
    try {
        // Obtener y validar el JSON
        const jsonText = document.getElementById('jsonInput').value;
        if (!jsonText.trim()) {
            alert('Por favor, ingresa el JSON para reemplazar los marcadores.');
            return;
        }

        const jsonData = JSON.parse(jsonText);

        // Para cada diapositiva en la plantilla
        plantilla.forEach((slide) => {
            const slideId = 'slide-' + slide.titulo.replace(/[^a-zA-Z0-9]/g, '-');
            const slideDiv = document.getElementById(slideId);

            if (slideDiv) {
                const titleDiv = slideDiv.querySelector('.slide-title');
                const contentDiv = slideDiv.querySelector('.slide-content');

                // Aplicar reemplazos al título
                let tituloConReemplazos = slide.titulo;
                for (const [marcador, valor] of Object.entries(jsonData)) {
                    const regex = new RegExp('{{' + marcador + '}}', 'g');
                    tituloConReemplazos = tituloConReemplazos.replace(regex, valor);
                }
                titleDiv.innerHTML = tituloConReemplazos;

                // Aplicar reemplazos al contenido
                let contenidoConReemplazos = slide.contenido;
                for (const [marcador, valor] of Object.entries(jsonData)) {
                    const regex = new RegExp('{{' + marcador + '}}', 'g');
                    contenidoConReemplazos = contenidoConReemplazos.replace(regex, valor);
                }
                contentDiv.innerHTML = contenidoConReemplazos.replace(/\n/g, '<br>');
            }
        });

        alert('¡Reemplazos aplicados correctamente!');
    } catch (error) {
        alert('Error al procesar el JSON: ' + error.message);
    }
}

// Introducir un JSON de ejemplo al cargar la página
window.onload = function () {
    // Cargar la plantilla con marcadores resaltados
    cargarPlantilla();

    // Cargar JSON de ejemplo
    document.getElementById('jsonInput').value = `{
"RESPASO_PUNTO1": "Repasamos el vocabulario sobre actividades de ocio.",
"RESPASO_PUNTO2": "Practicamos el uso de 'me gusta' y 'no me gusta'.",
"RESPASO_PUNTO3": "Vimos las diferencias entre 'ser' y 'estar'.",
"RESPASO_PUNTO4": "Aprendimos a conjugar verbos regulares en presente.",
"RESPASO_PUNTO5": "Practicamos preguntas básicas para conocer a alguien.",
"RESPASO_EJEMPLO_PERSONAL": "Por ejemplo, a mí me gusta leer pero no me gusta correr.",
"HOY_VEREMOS_PUNTO1": "Vocabulario sobre las rutinas diarias.",
"HOY_VEREMOS_PUNTO2": "Cómo hablar de horarios y momentos del día.",
"HOY_VEREMOS_PUNTO3": "Verbos reflexivos como 'levantarse', 'ducharse', etc.",
"HOY_VEREMOS_PUNTO4": "Expresiones de frecuencia: siempre, a veces, nunca.",
"HOY_VEREMOS_PUNTO5": "Cómo preguntar y responder sobre rutinas.",
"HOY_VEREMOS_PUNTO6": "Diferencias culturales en las rutinas diarias.",
"HISTORIA": "Carlos se levanta todos los días a las 6 de la mañana. Se ducha, desayuna y sale para el trabajo a las 7:30. Trabaja en una oficina desde las 8 hasta las 5 de la tarde. Después del trabajo, va al gimnasio tres veces por semana. Los otros días, estudia español en una academia. Cena a las 8 y se acuesta a las 11 de la noche.",
"PREGUNTA_CIRCULAR1": "¿A qué hora se levanta Carlos?",
"PREGUNTA_CIRCULAR2": "¿Qué hace después de levantarse?",
"PREGUNTA_CIRCULAR3": "¿Dónde trabaja Carlos?",
"PREGUNTA_CIRCULAR4": "¿Qué hace después del trabajo?",
"PREGUNTA_CIRCULAR5": "¿Cuántas veces por semana va al gimnasio?",
"PREGUNTA_CIRCULAR6": "¿Qué hace los días que no va al gimnasio?",
"PREGUNTA_CIRCULAR7": "¿A qué hora se acuesta Carlos?",
"JUEGO_DE_ROL_TITULO": "Un día en la vida de...",
"JUEGO_DE_ROL": "Ahora, imagina que eres Carlos o crea tu propio personaje. Explica tu rutina diaria usando los verbos reflexivos y expresiones de tiempo.",
"LECTURA_CORTA": "María y Luis tienen rutinas muy diferentes. María es profesora y se levanta muy temprano, a las 5:30 de la mañana. Se ducha, desayuna café con tostadas y sale de casa a las 6:30. Llega a la escuela a las 7 y trabaja hasta las 3 de la tarde. Luis es programador y trabaja desde casa. Él se levanta a las 9, desayuna tranquilamente mientras lee las noticias, y empieza a trabajar a las 10. Termina de trabajar a las 7 de la tarde. María y Luis son amigos, pero por sus horarios diferentes, solo pueden verse los fines de semana.",
"LECTURA_CORTA_PREGUNTA1": "¿Cuál es la profesión de María?",
"LECTURA_CORTA_PREGUNTA2": "¿A qué hora se levanta María?",
"LECTURA_CORTA_PREGUNTA3": "¿Qué desayuna María?",
"LECTURA_CORTA_PREGUNTA4": "¿Dónde trabaja Luis?",
"LECTURA_CORTA_PREGUNTA5": "¿Qué hace Luis mientras desayuna?",
"LECTURA_CORTA_PREGUNTA6": "¿A qué hora empieza a trabajar Luis?",
"LECTURA_CORTA_PREGUNTA7": "¿Cuándo pueden verse María y Luis?",
"LECTURA_CORTA_PREGUNTA_PERSONAL1": "¿Tu rutina es más parecida a la de María o a la de Luis?",
"LECTURA_CORTA_PREGUNTA_PERSONAL2": "¿A qué hora te levantas normalmente?",
"LECTURA_CORTA_PREGUNTA_PERSONAL3": "¿Qué desayunas habitualmente?",
"LECTURA_CORTA_PREGUNTA_PERSONAL4": "¿Trabajas o estudias? ¿En qué horario?",
"LECTURA_CORTA_PREGUNTA_PERSONAL5": "¿Tienes amigos con horarios muy diferentes al tuyo?",
"LECTURA_CORTA_PREGUNTA_PERSONAL6": "¿Qué es lo que más te gusta de tu rutina diaria?",
"LECTURA_CORTA_PREGUNTA_PERSONAL7": "¿Hay algo que te gustaría cambiar de tu rutina?",
"RESUMEN_DE_SESION": "Hoy hemos aprendido vocabulario sobre rutinas diarias, hemos practicado los verbos reflexivos como 'levantarse', 'ducharse', 'acostarse', etc. También hemos visto cómo hablar de horarios y usar expresiones de frecuencia. ¿Qué fue lo más interesante que aprendiste hoy?",
"TAREA_TITULO": "Mi rutina ideal",
"TAREA_INSTRUCCIONES": "Para la próxima clase, prepara una descripción de tu rutina ideal. Puedes incluir los siguientes puntos:",
"TAREA_PUNTO1": "A qué hora te gustaría levantarte.",
"TAREA_PUNTO2": "Qué te gustaría desayunar.",
"TAREA_PUNTO3": "Cómo sería tu horario de trabajo o estudio ideal.",
"TAREA_PUNTO4": "Qué actividades harías después del trabajo o estudio.",
"TAREA_PUNTO5": "A qué hora te acostarías."
}`;
};