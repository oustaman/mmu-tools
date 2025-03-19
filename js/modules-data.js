/**
 * University Modules Portal Data
 * This file contains the data for modules and programs.
 */

// Initial module data
const MODULES_DATA = {
    "mod-1-1": {
        id: "mod-1-1",
        code: "CS101",
        name: "Introduction to Programming",
        leader: "Dr. Smith",
        semester: 1,
        year: 1,
        moodleLink: "https://moodle.university.edu/course/view.php?id=101",
        specLink: "https://university.edu/specs/CS101.pdf",
        isCustom: false
    },
    "mod-1-2": {
        id: "mod-1-2",
        code: "CS102",
        name: "Data Structures and Algorithms",
        leader: "Dr. Johnson",
        semester: 2,
        year: 1,
        moodleLink: "https://moodle.university.edu/course/view.php?id=102",
        specLink: "https://university.edu/specs/CS102.pdf",
        isCustom: false
    },
    "mod-1-3": {
        id: "mod-1-3",
        code: "CS103",
        name: "Computer Architecture",
        leader: "Prof. Williams",
        semester: 1,
        year: 2,
        moodleLink: "https://moodle.university.edu/course/view.php?id=103",
        specLink: "https://university.edu/specs/CS103.pdf",
        isCustom: false
    },
    "mod-2-1": {
        id: "mod-2-1",
        code: "BIO101",
        name: "Cell Biology",
        leader: "Dr. Davis",
        semester: 1,
        year: 1,
        moodleLink: "https://moodle.university.edu/course/view.php?id=201",
        specLink: "https://university.edu/specs/BIO101.pdf",
        isCustom: false
    },
    "mod-2-2": {
        id: "mod-2-2",
        code: "BIO102",
        name: "Genetics",
        leader: "Prof. Miller",
        semester: 2,
        year: 1,
        moodleLink: "https://moodle.university.edu/course/view.php?id=202",
        specLink: "https://university.edu/specs/BIO102.pdf",
        isCustom: false
    },
    "mod-2-3": {
        id: "mod-2-3",
        code: "BIO103",
        name: "Ecology",
        leader: "Dr. Wilson",
        semester: 2,
        year: 2,
        moodleLink: "https://moodle.university.edu/course/view.php?id=203",
        specLink: "https://university.edu/specs/BIO103.pdf",
        isCustom: false
    },
    "mod-3-1": {
        id: "mod-3-1",
        code: "MATH101",
        name: "Calculus I",
        leader: "Prof. Brown",
        semester: 1,
        year: 1,
        moodleLink: "https://moodle.university.edu/course/view.php?id=301",
        specLink: "https://university.edu/specs/MATH101.pdf",
        isCustom: false
    },
    "mod-3-2": {
        id: "mod-3-2",
        code: "MATH102",
        name: "Linear Algebra",
        leader: "Dr. Taylor",
        semester: 2,
        year: 1,
        moodleLink: "https://moodle.university.edu/course/view.php?id=302",
        specLink: "https://university.edu/specs/MATH102.pdf",
        isCustom: false
    },
    "mod-3-3": {
        id: "mod-3-3",
        code: "MATH103",
        name: "Discrete Mathematics",
        leader: "Dr. Anderson",
        semester: 1,
        year: 2,
        moodleLink: "https://moodle.university.edu/course/view.php?id=303",
        specLink: "https://university.edu/specs/MATH103.pdf",
        isCustom: false
    }
};

// Programs data
const PROGRAMS_DATA = [
    {
        id: "prog-1",
        name: "Computer Science Undergraduate",
        moduleIds: ["mod-1-1", "mod-1-2", "mod-1-3"]
    },
    {
        id: "prog-2",
        name: "Biology Undergraduate",
        moduleIds: ["mod-2-1", "mod-2-2", "mod-2-3"]
    },
    {
        id: "prog-3",
        name: "Mathematics Undergraduate",
        moduleIds: ["mod-3-1", "mod-3-2", "mod-3-3", "mod-1-1"] // CS101 is shared
    }
];

// Make data available globally
window.MODULES_DATA = MODULES_DATA;
window.PROGRAMS_DATA = PROGRAMS_DATA;