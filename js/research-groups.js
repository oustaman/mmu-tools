// Define research groups data
const researchGroups = [
    {
        id: "dark-arts",
        name: "The Dark Arts Research Kollective (DȺRK)",
        status: "Emergent",
        leads: ["Christopher Gladwin", "John Lloyd"],
        description: "DȺRK is a new dynamic research community driven by meaningful research connections and a passion for creative excellence. The DȺRK is research-led, practice-based, interdisciplinary and public-facing. Through art and creative practices, the primary research focus for DȺRK is to investigate occulture, the paranormal, magic, esoterism and counterculture. We are passionate about using insights from occulture to create innovative research outputs which are impactful beyond academia through pioneering new and alternative cultural and social understandings of the world. We aim to achieve this through reusing and remediating physical and metaphysical technologies to invent new and peripheral forms of storytelling, developing innovative methodologies, and to explore the practices and discourses of subcultural and countercultural movements to refigure hegemonic epistemologies and develop new ways of thinking.",
        department: "English",
        subdepartment: "SODA",
        primaryMembers: {
            "English": ["Christopher Gladwin", "John Lloyd"],
            "SODA": []
        },
        affiliateMembers: {
            "SODA": ["Chloe Germaine"]
        },
        focusAreas: {
            title: "Research Focus",
            items: [
                "Occult and paranormal phenomena",
                "Subcultural and countercultural movements",
                "Creative storytelling through alternative methodologies",
                "Metaphysical technologies and applications"
            ]
        },
        keywords: ["art", "creative", "paranormal", "magic", "esoterism", "counterculture", "occulture", "storytelling"],
        researchAreas: ["Creative Arts", "Cultural Studies", "Alternative Knowledge Systems"]
    },
    {
        id: "drugs-policy",
        name: "Drugs Policy and Social Change",
        status: "Established",
        leads: ["Rebecca Askew", "Rob Ralphs"],
        description: "Drugs, Drug Policy and Social Change (DPSC) addresses novel and emerging challenges in research design, knowledge translation and policy impact within the regional, national and international Alcohol and Other Drug (AOD) research. DPSC studies AOD from within the social sciences. This includes the study of drug trends, patterns and cultures across the market incorporating use, supply, cultivation, and production. Our vision seeks to better understand the meaning of drugs within contexts, cultures and communities and connect this knowledge to societal responses to drugs, including approaches to policy, practice and media discourse. Our research draws on a broad interdisciplinary theoretical framework which includes criminology, sociology, economics, social psychology, and cultural studies. We adopt a collective approach to research, specializing in ethnography, participatory methods, creative methods and narrative approaches. DPSC strives to promote positive social change within affected communities and impact the work of policymakers, treatment and support providers, advocacy and activist groups and drug policy organization and networks.",
        department: "Sociology",
        subdepartment: "",
        primaryMembers: {
            "Sociology": ["Anna Norton", "Jessica Williamson", "Liviu Alexandrescu", "Mike Salinas", "Rebecca Askew", "Rob Ralphs"]
        },
        affiliateMembers: {
            "Media": ["Paul Bason"],
            "Health": ["Paul Gray", "Richard Kelly"]
        },
        focusAreas: {
            title: "Key Areas of Research",
            items: [
                "Drug trends, patterns, and cultures",
                "Policy development and implementation",
                "Ethnography and participatory research methods",
                "Social impacts of substance use and policy"
            ]
        },
        keywords: ["drugs", "policy", "social change", "alcohol", "criminology", "sociology", "ethnography"],
        researchAreas: ["Sociology", "Criminology", "Public Policy", "Social Sciences"]
    },
    {
        id: "digital-futures",
        name: "Digital Futures Innovation Lab",
        status: "Established",
        leads: ["Sarah Johnson", "David Chen"],
        description: "The Digital Futures Innovation Lab (DFIL) explores emerging technologies and their social, economic, and cultural impacts. We conduct cutting-edge research on artificial intelligence, virtual reality, blockchain, and other transformative technologies. Our multidisciplinary team develops prototypes, frameworks, and critical analyses that help shape responsible innovation practices. We collaborate with industry partners, government agencies, and communities to ensure technology development serves human needs and values. DFIL is committed to democratizing access to digital tools and ensuring technological advancement promotes equity and sustainability.",
        department: "Computer Science",
        subdepartment: "Digital Innovation",
        primaryMembers: {
            "Computer Science": ["Sarah Johnson", "David Chen", "Amara Patel", "Marcus Wilson"],
            "Digital Innovation": ["Elena Rodriguez"]
        },
        affiliateMembers: {
            "Business": ["Thomas Burton"],
            "Arts & Humanities": ["Grace Liu", "Nadia Okafor"]
        },
        focusAreas: {
            title: "Research Themes",
            items: [
                "Artificial intelligence and machine learning",
                "Virtual and augmented reality applications",
                "Blockchain and distributed technologies",
                "Human-centered computing",
                "Ethical dimensions of emerging technologies"
            ]
        },
        keywords: ["artificial intelligence", "virtual reality", "blockchain", "digital innovation", "emerging technologies", "responsible tech"],
        researchAreas: ["Computer Science", "Digital Media", "Technology Ethics", "Human-Computer Interaction"]
    },
    {
        id: "climate-resilience",
        name: "Urban Climate Resilience Initiative",
        status: "Emerging",
        leads: ["Miguel Santos", "Jennifer Wu"],
        description: "The Urban Climate Resilience Initiative (UCRI) focuses on developing sustainable strategies to help cities adapt to climate change. Our research combines environmental science, urban planning, architecture, and social policy to create holistic approaches to urban resilience. We study green infrastructure, sustainable transportation, community-based adaptation, and climate justice issues. UCRI works directly with local governments, community organizations, and residents to co-create actionable solutions that address both the physical infrastructure needs and social dimensions of climate adaptation. Our work spans from modeling future climate scenarios to evaluating the effectiveness of current resilience policies.",
        department: "Environmental Science",
        subdepartment: "Urban Planning",
        primaryMembers: {
            "Environmental Science": ["Miguel Santos", "Priya Mehta"],
            "Urban Planning": ["Jennifer Wu", "Alex Thompson", "Liam O'Connor"]
        },
        affiliateMembers: {
            "Architecture": ["Sofia Delgado"],
            "Sociology": ["Kwame Osei"],
            "Engineering": ["Beatrice Chen"]
        },
        focusAreas: {
            title: "Key Focus Areas",
            items: [
                "Urban resilience and adaptation strategies",
                "Green infrastructure development",
                "Climate justice and equity",
                "Community-based adaptation planning",
                "Sustainable transportation systems"
            ]
        },
        keywords: ["climate change", "urban planning", "sustainability", "green infrastructure", "adaptation", "resilience", "climate justice"],
        researchAreas: ["Environmental Science", "Urban Studies", "Climate Adaptation", "Sustainable Development"]
    },
    {
        id: "place-writing",
        name: "Centre for Place Writing (CPW)",
        status: "Self-Managing",
        leads: ["David Cooper", "Rachel Lichtenstein"],
        description: "CPW has an international reputation for impactful creative-critical literary research on place and its meanings. Through interdisciplinary collaboration, we develop innovative practice-based methodologies, and field-leading critical thinking, to advance the understanding of how site-specific literary writing can generate a transformative reimagining of the geographical world. In the process, CPW endeavours to inform and shape public debates about some of the most urgent issues of our time.",
        department: "English",
        subdepartment: "",
        primaryMembers: {
            "English": ["Andrew Biswell", "Berthold Schoene", "David Cooper", "Francesca Mackenney", "Helen Mort", "Jess Edwards", "Jodie Matthews", "Kate Pahl", "Rachel Lichtenstein", "Sarah Butler"],
            "Architecture": [],
            "Art & Performance": [],
            "Fashion": [],
            "History, Politics and Philosophy": [],
            "Languages & Info Comms": [],
            "SODA": []
        },
        affiliateMembers: {
            "English": ["Andrew Hurley", "Anjum Malik", "Antony Rowland", "David Wilkinson", "Gregory Norminton", "Jean Sprackland", "Lara Williams", "Michael Symmons Roberts", "Nikolai Duffy", "Oliver Harris", "Rachel Dickinson", "Rachel Genn"],
            "Architecture": ["Daniel Dubowitz"],
            "Art & Performance": ["Alison Slater", "Judith Walsh", "Michael Pinchbeck", "Beccy Kennedy-Schtyk"],
            "Fashion": ["Morolake Dairo", "Sharon Nunoo"],
            "History, Politics and Philosophy": ["Catherine Fletcher", "Kathryn Starnes"],
            "Languages & Info Comms": ["Marta Suarez"],
            "SODA": ["Rob Potts"]
        },
        focusAreas: {
            title: "Research Focus",
            items: [
                "The climate emergency",
                "Heritage, memory, and identity",
                "Co-creating with communities in (Greater) Manchester",
                "The voices of young people being heard through creative practice"
            ]
        },
        keywords: ["place writing", "creative writing", "literary research", "geography", "creative practice", "climate", "heritage", "memory", "identity", "community"],
        researchAreas: ["Literary Studies", "Creative Writing", "Environmental Humanities", "Cultural Geography"]
    }
];

// Export the data for use in other scripts
window.researchGroupsData = researchGroups;