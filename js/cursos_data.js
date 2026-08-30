const cursos = [
  {
    id: 1,
    titulo: "Hacking Ético y Pentesting Web",
    categoria: "Red Team",
    nivel: "Intermedio",
    duracion: "40 horas",
    precio: 79.99,
    imagen: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    descripcion: "Auditoría de aplicaciones web, OWASP Top 10, explotación de vulnerabilidades y elaboración de informes técnicos."
  },
  {
    id: 2,
    titulo: "Defensa de Redes y Monitoreo SOC",
    categoria: "Blue Team",
    nivel: "Principiante",
    duracion: "35 horas",
    precio: 69.99,
    imagen: "https://i.ytimg.com/vi/p08Bkpde1sI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCsm7Zn6jr5IgKtzgeL68SsiX02Lg",
    descripcion: "Análisis de tráfico de red con Wireshark, gestión de SIEM, detección de intrusos y respuesta a incidentes."
  },
  {
    id: 3,
    titulo: "Análisis Forense Digital y Malware",
    categoria: "DFIR",
    nivel: "Avanzado",
    duracion: "50 horas",
    precio: 99.99,
    imagen: "https://img2.helpnetsecurity.com/posts2025/ghidra-650.webp",
    descripcion: "Ingeniería inversa de binarios, extracción de memoria RAM, análisis de artifacts en Windows/Linux y cadena de custodia."
  },
  {
    id: 4,
    titulo: "Hardware Hacking y Seguridad en IoT",
    categoria: "Red Team",
    nivel: "Avanzado",
    duracion: "45 horas",
    precio: 89.99,
    imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    descripcion: "Análisis de buses I2C, SPI y UART, extracción de firmware con Bus Pirate y vulnerabilidades en microcontroladores ESP32."
  },
  {
    id: 5,
    titulo: "Hardening y Seguridad en Servidores Linux",
    categoria: "Blue Team",
    nivel: "Intermedio",
    duracion: "30 horas",
    precio: 59.99,
    imagen: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
    descripcion: "Aseguramiento de Kernel Linux, gestión de permisos avanzados, implementación de SELinux/AppArmor y cortafuegos IPTables/UFW."
  },
  {
    id: 6,
    titulo: "Criptografía Aplicada y Protocolos Seguros",
    categoria: "DFIR",
    nivel: "Intermedio",
    duracion: "25 horas",
    precio: 49.99,
    imagen: "https://plus.unsplash.com/premium_photo-1733317239304-a6bf462a2596?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descripcion: "Implementación de cifrado simétrico/asimétrico, funciones Hash, PKI, análisis de vulnerabilidades en SSL/TLS y SSH."
  },
  {
    id: 7,
    titulo: "Auditoría RF y Emulación con Flipper Zero",
    categoria: "Red Team",
    nivel: "Principiante",
    duracion: "30 horas",
    precio: 64.99,
    imagen: "https://cdn.flipper.net/zero_landing_subghz_flipper.jpg",
    descripcion: "Análisis e intercepción de señales Sub-1 GHz, emulación de tarjetas NFC/RFID, ataques BadUSB y desarrollo de aplicaciones en C para Flipper Zero."
  },
  {
    id: 8,
    titulo: "Radio Definida por Software (SDR) con HackRF One",
    categoria: "Red Team",
    nivel: "Avanzado",
    duracion: "50 horas",
    precio: 109.99,
    imagen: "https://greatscottgadgets.com/images/h1-preliminary1-445.jpeg",
    descripcion: "Captura y replay de señales de radio de 1 MHz a 6 GHz con GNU Radio, análisis de protocolos GPS, GSM, ADS-B e inspección de espectro electromagnético."
  }
];