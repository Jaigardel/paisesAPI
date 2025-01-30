const paisInput = document.getElementById("pais");
        const enviar = document.getElementById("enviar");
        const nombre = document.getElementById("nombre");
        const capital = document.getElementById("capital");
        const poblacion = document.getElementById("poblacion");
        const bandera = document.getElementById("bandera");
        const errores = document.querySelector(".error");
        const select = document.getElementById("select");

        // Función para buscar un país
        const buscarPais = async (nombrePais) => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nombrePais)}`);
                if (!response.ok) throw new Error("País no encontrado.");
                const data = await response.json();
                const pais = data[0];

                nombre.textContent = pais.name.common || "No disponible";
                capital.textContent = pais.capital ? pais.capital[0] : "No disponible";
                poblacion.textContent = pais.population.toLocaleString("es-ES") || "No disponible";
                bandera.innerHTML = `<img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}">`;
                errores.textContent = "";
            } catch (error) {
                errores.textContent = "No existe ese país o está mal escrito.";
                nombre.textContent = capital.textContent = poblacion.textContent = bandera.innerHTML = "-";
            }
        };

        // Función para cargar todos los países en el select
        const cargarPaises = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                data.forEach(pais => {
                    const option = document.createElement("option");
                    option.value = pais.name.common;
                    option.textContent = pais.name.common;
                    select.appendChild(option);
                });
            } catch (error) {
                errores.textContent = "No se pudo cargar la lista de países.";
            }
        };

        // Evento del formulario
        enviar.addEventListener("click", (e) => {
            e.preventDefault();
            errores.textContent = "";

            if (select.value === "default") {
                const input = paisInput.value.trim();
                if (input === "") {
                    errores.textContent = "Introduzca un nombre o elija un país.";
                    return;
                }
                buscarPais(input);
                paisInput.value = "";
            } else {
                buscarPais(select.value);
                select.value = "default";
            }
        });

        // Cargar países al cargar la página
        cargarPaises();