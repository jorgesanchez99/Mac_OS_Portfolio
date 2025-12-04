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
        title: "POO en Java",
        image: "/images/java-poo.png",
        description: "Clases, objetos, herencia y buenas prácticas.",
        link: "",
    },
    {
        id: 2,
        title: "Colecciones",
        image: "/images/java-collections.png",
        description: "Uso de List, Set y Map con ejercicios básicos.",
        link: "",
    },
    {
        id: 3,
        title: "Mini proyectos",
        image: "/images/java-mini-projects.png",
        description: "BankAccount, Gestor de Notas y CRUD simples.",
        link: "",
    },
    {
        id: 4,
        title: "Generics",
        image: "/images/java-generics.png",
        description: "Tipos genéricos y estructuras flexibles. Próximo mini proyecto.",
        link: "",
    },
    {
        id: 5,
        title: "Streams (Próximamente)",
        image: "/images/java-streams.png",
        description: "Filtros, mapeos y ordenamientos. Mini proyecto en camino.",
        link: "",
    },
    {
        id: 6,
        title: "Concurrencia",
        image: "/images/java-threads.png",
        description: "Threads y tareas paralelas. Más adelante.",
        link: "",
    },
    {
        id: 7,
        title: "Spring Boot",
        image: "/images/java-spring-next.png",
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
            name: "Nike Ecommerce Website Application",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Nike Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
                        "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
                        "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
                        "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
                    ],
                },
                {
                    id: 2,
                    name: "nike.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "nike.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
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
        },

        // ▶ Project 2
        {
            id: 6,
            name: "AI Resume Analyzer",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "AI Resume Analyzer Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
                        "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
                        "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
                        "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
                    ],
                },
                {
                    id: 2,
                    name: "ai-resume-analyzer.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "ai-resume-analyzer.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/project-2.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Food Delivery App",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Food Delivery App Project.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
                        "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
                        "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
                        "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
                    ],
                },
                {
                    id: 2,
                    name: "food-delivery-app.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "food-delivery-app.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-3.png",
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
        },
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