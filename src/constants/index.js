const navLinks = [
    {
        id: 1,
        name: "Proyectos",
        type: "finder",
    },
    {
        id: 3,
        name: "Contacto",
        type: "contact",
    },
    {
        id: 4,
        name: "CV",
        type: "resume",
    },
];

const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portafolio", // was "Finder"
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Mini Proyectos Java", // was "Safari"
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "gallery",
        name: "Galleria", // was "Photos"
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contacto", // or "Get in touch"
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archivo", // was "Trash"
        icon: "trash.png",
        canOpen: false,
    },
];

const javaShowcase = [
    {
        id: 1,
        title: "Inventory Manager (CRUD + JSON)",
        image: "/images/javashowcase/java-inventory.png",
        description: "Gestión de inventario con MVC, validaciones y persistencia JSON.",
        link: "https://github.com/jorgesanchez99/inventory-manager",
    },
    {
        id: 2,
        title: "Colecciones",
        image: "/images/javashowcase/java-collections.png",
        description: "Uso de List, Set y Map con ejercicios básicos.",
        link: "",
    },
    {
        id: 3,
        title: "Mini proyectos",
        image: "/images/javashowcase/java-mini-projects.png",
        description: "BankAccount, Gestor de Notas y CRUD simples.",
        link: "",
    },
    {
        id: 4,
        title: "Generics",
        image: "/images/javashowcase/java-generics.png",
        description: "Tipos genéricos y estructuras flexibles. Próximo mini proyecto.",
        link: "",
    },
    {
        id: 5,
        title: "Streams (Próximamente)",
        image: "/images/javashowcase/java-streams.png",
        description: "Filtros, mapeos y ordenamientos. Mini proyecto en camino.",
        link: "",
    },
    {
        id: 6,
        title: "Concurrencia",
        image: "/images/javashowcase/java-threads.png",
        description: "Threads y tareas paralelas. Más adelante.",
        link: "",
    },
    {
        id: 7,
        title: "Spring Boot",
        image: "/images/javashowcase/java-spring-next.png",
        description: "Mi siguiente meta: APIs REST con Spring.",
        link: "",
    },
];


const techStack = [
    {
        category: "Backend (Principal)",
        items: ["Java", "Java OOP", "Spring Boot (Aprendiendo)", "JDBC", "SQL"],
    },
    {
        category: "Frontend",
        items: ["HTML", "CSS", "JavaScript (Aprendiendo)", "React (Básico)", "Vite"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS"],
    },
    {
        category: "Databases",
        items: ["MySQL", "PostgreSQL"],
    },
    {
        category: "Tools",
        items: ["Git", "GitHub", "IntelliJ IDEA", "WebStorm", "Figma"],
    },
    {
        category: "Learning Path",
        items: ["TypeScript", "Spring Boot", "REST APIs", "React avanzado"],
    },
];


const socials = [
    {
        id: 1,
        text: "GitHub",
        icon: "/icons/github.svg",
        bg: "#24292e", // negro GitHub
        link: "https://github.com/jorgesanchez99",
    },
    {
        id: 2,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#0A66C2", // azul oficial LinkedIn
        link: "https://www.linkedin.com/in/jorge-anthony-sanchez-chavez/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/icons/twitter.svg",
        bg: "#000000", // X usa el negro ahora
        link: "https://x.com/Jascmen1",
    },
    {
        id: 4,
        text: "Instagram",
        icon: "/icons/instagram.svg",
        bg: "#E4405F", // color oficial IG
        link: "https://www.instagram.com/jascmen/",
    },
];


const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        fileType: "img",
        kind: "file",
        imageUrl: "/images/gallery/keiko-right.jpg",
    },
    {
        id: 2,
        fileType: "img",
        kind: "file",
        imageUrl: "/images/gallery/keiko-bed2.jpg",
    },
    {
        id: 3,
        fileType: "img",
        kind: "file",
        imageUrl: "/images/gallery/keiko-perfil.jpg",
    },
    {
        id: 4,
        fileType: "img",
        kind: "file",
        imageUrl: "/images/gallery/keiko-bed3.jpg",
    },

];

export {
    navLinks,
    navIcons,
    dockApps,
    javaShowcase,
    techStack,
    socials,
    photosLinks,
    gallery,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Proyecto 1",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5",
            windowPosition: "top-[5vh] left-5",
            children: [
                {
                    id: 1,
                    name: "project-info.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Aquí irá la descripción de un futuro proyecto.",
                        "Cuando se construya un proyecto real, se reemplazará este texto.",
                    ],
                },
                {
                    id: 2,
                    name: "demo-url",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://www.youtube.com/",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "preview.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/jorge.jpg",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        }

    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "pet.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/jorge.jpg",
        },
        {
            id: 2,
            name: "pet-family.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/pet-family.jpg",
        },
        {
            id: 3,
            name: "keiko-bed.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/keiko-bed.jpg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Conoce al desarrollador detrás del código",
            image: "/images/jorge.jpg",
            description: [
                "Hola, soy Jorge 👋, desarrollador backend en formación con enfoque en Java y muchas ganas de crecer en el ecosistema web.",
                "Actualmente refuerzo fundamentos de Java (POO, colecciones, genéricos, streams, concurrencia) mientras construyo bases sólidas en HTML, CSS, JavaScript y React.",
                "Me gusta escribir código limpio y entendible, cuidar la arquitectura incluso en proyectos pequeños y aplicar buenas prácticas siempre que puedo.",
                "Fuera del código suelo ver series de crimen y policiacas, jugar videojuegos online, ver anime y videos de tecnología y programación… siempre con algo nuevo que aprender 😅",
            ],
        }

    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "CV_Jorge_Sanchez.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
    finder: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    contact: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    resume: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    safari: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    gallery: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    terminal: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    txtfile: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
    imgfile: {isOpen: false, zIndex: INITIAL_Z_INDEX, data: null},
};

export {INITIAL_Z_INDEX, WINDOW_CONFIG};