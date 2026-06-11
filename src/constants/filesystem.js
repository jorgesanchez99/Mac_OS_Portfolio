const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1 — id 5 continúa después de las 4 locations de nivel raíz,
        // así no colisiona con ellas en el sidebar del Finder.
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
                    id: 3,
                    name: "preview.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/jorge.jpg",
                },
                {
                    id: 4,
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
