/* A fabricated student portfolio, written to sit just over the pass line.
 *
 *  NOT REAL STUDENT WORK. Invented for teaching, by the module team. No real
 *  submission has been reproduced, adapted or paraphrased here.
 *
 *  It is a SLIDE DECK, because that is what students hand in: one section per
 *  slide, PowerPoint or Google Slides, exported to PDF. The example has to be
 *  the shape of the thing it is teaching them to make.
 *
 *  It is written to fail in the ways real Level 4 portfolios actually fail —
 *  not by being empty, which is easy to spot, but by being PRESENT and THIN.
 *  Everything the brief asks for is nominally there. Almost none of it is
 *  evidenced. That is what a 42 looks like, and it is much harder for a
 *  student to recognise than a blank slide.
 *
 *  The deliberate faults, so a tutor running the exercise knows what to steer
 *  the room toward:
 *    · A2 lists five screens where the brief asks for six to eight
 *    · A3 and A4 carry "about" where a number belongs
 *    · A5's contrast table has two rows for five colours, and one of them fails
 *    · A6 is nearly empty
 *    · A7 says none, while B4 is visibly generated
 *    · B8 has three links of six, and one starts from a control that is not drawn
 *    · C6 and C7 are missing entirely — both are required by the brief
 *    · C8 contradicts the evidence in B4
 *    · C9 has no references, and nothing in C is cited
 *  Any two of those cap Criterion 4. All of them together is a Third.
 *
 *  `slides` replaced `pages` when the hand-in became a deck. A slide is
 *  {n, kind, sec, blocks}: kind is title | divider | section, and a note on a
 *  block is a margin comment shown only in the marked copy.
 */
const EXAMPLE = {
 "meta": {
  "title": "screen-design-portfolio",
  "student": "",
  "words": 1847,
  "slides": 25
 },
 "mark": {
  "overall": 42,
  "band": "Third · 40–49%"
 },
 "slides": [
  {
   "kind": "title",
   "blocks": [
    {
     "t": "h1",
     "x": "SCREEN DESIGN — PORTFOLIO"
    },
    {
     "t": "meta",
     "x": "Student ID: 22461173"
    }
   ],
   "n": 1
  },
  {
   "kind": "divider",
   "blocks": [
    {
     "t": "h2",
     "x": "PART A — DESIGN SPEC SHEET"
    }
   ],
   "n": 2
  },
  {
   "kind": "section",
   "sec": "A1",
   "blocks": [
    {
     "t": "h3",
     "x": "A1.  THEME & AUDIENCE"
    },
    {
     "t": "kv",
     "x": [
      [
       "Theme",
       "A plant app"
      ],
      [
       "Audience",
       "People who like plants"
      ]
     ],
     "note": {
      "c": 1,
      "band": "Third",
      "s": "\"People who like plants\" is not an audience — it names everyone who might download it. Nothing downstream can be tested against this, so C1 has nothing to cite and the whole rationale starts unanchored."
     }
    }
   ],
   "n": 3
  },
  {
   "kind": "section",
   "sec": "A2",
   "blocks": [
    {
     "t": "h3",
     "x": "A2.  SCREEN INVENTORY"
    },
    {
     "t": "kv",
     "x": [
      [
       "1",
       "Home"
      ],
      [
       "2",
       "Plant list"
      ],
      [
       "3",
       "Add plant"
      ],
      [
       "4",
       "Settings"
      ],
      [
       "5",
       "Profile"
      ]
     ],
     "note": {
      "c": 1,
      "band": "Third",
      "s": "Five screens where the brief asks for six to eight — and the jobs are nouns, not jobs. No empty state, no error, no confirmation. Week 7 asks specifically for these and they are missing, which also removes the material C5 needs."
     }
    }
   ],
   "n": 4
  },
  {
   "kind": "section",
   "sec": "A3",
   "blocks": [
    {
     "t": "h3",
     "x": "A3.  LAYOUT"
    },
    {
     "t": "kv",
     "x": [
      [
       "Columns",
       "12"
      ],
      [
       "Gutter",
       "about 20px"
      ],
      [
       "Margin",
       "16"
      ],
      [
       "Max width",
       ""
      ],
      [
       "Breakpoint 1",
       "mobile"
      ],
      [
       "Breakpoint 2",
       "desktop"
      ],
      [
       "Breakpoint 3",
       ""
      ],
      [
       "Spacing scale",
       "8, 16, 24"
      ]
     ],
     "note": {
      "c": 1,
      "band": "Third",
      "s": "\"About 20px\" is not a declared value, \"mobile\" is not a breakpoint, and two fields are blank. The brief asks for responsive design; two named sizes cannot evidence it. C2 later claims a grid this section does not contain."
     }
    }
   ],
   "n": 5
  },
  {
   "kind": "section",
   "sec": "A4",
   "blocks": [
    {
     "t": "h3",
     "x": "A4.  TYPOGRAPHY"
    },
    {
     "t": "kv",
     "x": [
      [
       "Heading family",
       "Montserrat"
      ],
      [
       "Body family",
       "Open Sans"
      ],
      [
       "Third family",
       "Pacifico (logo)"
      ],
      [
       "Base size",
       "16"
      ],
      [
       "Scale ratio",
       ""
      ],
      [
       "Sizes and their roles",
       "32, 24, 16, 14"
      ],
      [
       "Line height",
       "normal"
      ],
      [
       "Measure (characters per line)",
       ""
      ]
     ],
     "note": {
      "c": 1,
      "band": "2:2",
      "s": "Sizes and families are here, which is more than many. But no ratio, no line height, no measure — so the scale is a list rather than a system, and C3 cannot quote a figure that was never recorded."
     }
    }
   ],
   "n": 6
  },
  {
   "kind": "section",
   "sec": "A5",
   "blocks": [
    {
     "t": "h3",
     "x": "A5.  COLOUR + CONTRAST TABLE"
    },
    {
     "t": "kv",
     "x": [
      [
       "Background",
       "#FFFFFF"
      ],
      [
       "Surface",
       "#F4F4F4"
      ],
      [
       "Body text",
       "#8A8A8A"
      ],
      [
       "Quiet text",
       "#B4B4B4"
      ],
      [
       "Accent",
       "#7ED957"
      ]
     ]
    },
    {
     "t": "pre",
     "x": "CONTRAST\n  body on background   = 3.45:1\n  accent on background = 1.75:1",
     "note": {
      "c": 2,
      "band": "Third",
      "s": "Two rows for five colours, and BOTH FAIL. 3.45:1 and 1.75:1 are recorded, unremarked and unchanged — the student measured the problem in week 5 and did nothing. This is the clearest single reason the work sits in the third band rather than the 2:2: the evidence of a failure is in the document, uncorrected."
     }
    }
   ],
   "n": 7
  },
  {
   "kind": "section",
   "sec": "A6",
   "blocks": [
    {
     "t": "h3",
     "x": "A6.  ACCESSIBILITY"
    },
    {
     "t": "kv",
     "x": [
      [
       "Minimum touch target",
       ""
      ],
      [
       "Focus state",
       "default"
      ],
      [
       "Non-colour cues",
       ""
      ]
     ],
     "note": {
      "c": 2,
      "band": "Fail",
      "s": "Two blanks and \"default\". Criterion 2 asks for evidence of accessibility consideration; there is none here, and C5 has nothing to quote."
     }
    }
   ],
   "n": 8
  },
  {
   "kind": "section",
   "sec": "A7",
   "blocks": [
    {
     "t": "h3",
     "x": "A7.  AI USE LOG"
    },
    {
     "t": "kv",
     "x": [
      [
       "Tool | What it made | What I changed | Why",
       "N/A — did not use AI"
      ]
     ],
     "note": {
      "c": 4,
      "band": "Fail",
      "s": "Declared as none. Compare with B4 on page 4 — the style tile imagery is characteristic of a generator. If the declaration is wrong, that is a misconduct question and not a marking one; either way it cannot be left as it stands. Raise it, do not assume it."
     }
    }
   ],
   "n": 9
  },
  {
   "kind": "divider",
   "blocks": [
    {
     "t": "h2",
     "x": "PART B — THE WORK"
    }
   ],
   "n": 10
  },
  {
   "kind": "section",
   "sec": "B1",
   "blocks": [
    {
     "t": "h3",
     "x": "B1.  CONCEPT SKETCHES"
    },
    {
     "t": "img",
     "a": "sketches",
     "x": "photo of two pencil sketches, taken at an angle, one partly out of frame",
     "h": 180
    },
    {
     "t": "cap",
     "x": "My first sketches.",
     "note": {
      "c": 3,
      "band": "Third",
      "s": "Two sketches where week 2 produced eight, photographed badly. The caption is three words where the brief asks for about a hundred, and it says nothing about what the sketch decided. Criterion 3 is about evidencing a process; this evidences that one happened."
     }
    }
   ],
   "n": 11
  },
  {
   "kind": "section",
   "sec": "B2",
   "blocks": [
    {
     "t": "h3",
     "x": "B2.  MOOD BOARD"
    },
    {
     "t": "img",
     "a": "mood",
     "x": "nine stock photographs of houseplants, evenly gridded",
     "h": 200
    },
    {
     "t": "cap",
     "x": "My mood board shows the feeling I wanted, which is calm and natural."
    }
   ],
   "n": 12
  },
  {
   "kind": "section",
   "sec": "B3",
   "blocks": [
    {
     "t": "h3",
     "x": "B3.  STYLE TILE"
    },
    {
     "t": "img",
     "a": "tile",
     "x": "a style tile: three fonts, five colour swatches, two buttons",
     "h": 210
    },
    {
     "t": "cap",
     "x": "My style tile.",
     "note": {
      "c": 1,
      "band": "2:2",
      "s": "The tile exists and is legible, which is the strongest part of this submission. But the swatches are the same failing greys recorded in A5, so the system is internally consistent and externally unreadable."
     }
    }
   ],
   "n": 13
  },
  {
   "kind": "section",
   "sec": "B4",
   "blocks": [
    {
     "t": "h3",
     "x": "B4.  FLOW DIAGRAM"
    },
    {
     "t": "img",
     "a": "flow",
     "x": "a generated illustration of an app flow — glossy, symmetrical, four of the eight labels misspelt",
     "h": 230
    },
    {
     "t": "cap",
     "x": "This shows how the user moves through my app.",
     "note": {
      "c": 4,
      "band": "Fail",
      "s": "Four of the eight labels are misspelt — Plannt Lisst, Settingss, Plant Detial, Add Plnat — and so is the title. An arrow leaves Profile and arrives nowhere. Nobody types a flowchart that way, and a student who drew it by hand would have caught it. Set against A7's \"did not use AI\" and C8's repetition of it, this is the point the exercise is really about: what does a marker do with an undeclared tool? The answer is not to guess — it is to ask."
     }
    }
   ],
   "n": 14
  },
  {
   "kind": "section",
   "sec": "B5",
   "blocks": [
    {
     "t": "h3",
     "x": "B5.  WIREFRAME SET"
    },
    {
     "t": "img",
     "a": "wires",
     "x": "five wireframes, greyboxed, no labels on three of them",
     "h": 200
    },
    {
     "t": "cap",
     "x": "Wireframes for all my screens."
    }
   ],
   "n": 15
  },
  {
   "kind": "section",
   "sec": "B6",
   "blocks": [
    {
     "t": "h3",
     "x": "B6.  6–8 FINISHED SCREENS"
    },
    {
     "t": "img",
     "a": "screens",
     "x": "five finished screens, light grey text on white throughout",
     "h": 210
    },
    {
     "t": "cap",
     "x": "My final screens.",
     "note": {
      "c": 1,
      "band": "Third",
      "s": "Five again, so B6 cannot satisfy a brief asking for six to eight. Visually coherent — which earns something — but coherent in a scheme that fails contrast on every screen."
     }
    }
   ],
   "n": 16
  },
  {
   "kind": "section",
   "sec": "B7",
   "blocks": [
    {
     "t": "h3",
     "x": "B7.  2 SCREENS × 3 SIZES"
    },
    {
     "t": "img",
     "a": "resp",
     "x": "the same screen twice, at two widths, the second visibly a scaled copy",
     "h": 150
    },
    {
     "t": "cap",
     "x": "Responsive versions.",
     "note": {
      "c": 1,
      "band": "Third",
      "s": "Two sizes, not three, and the narrow one is the wide one scaled — nothing has been removed or reflowed. This is the exact failure week 9 exists to prevent, and it directly contradicts the brief's requirement for responsive design."
     }
    }
   ],
   "n": 17
  },
  {
   "kind": "section",
   "sec": "B8",
   "blocks": [
    {
     "t": "h3",
     "x": "B8.  CLICK-THROUGH"
    },
    {
     "t": "pre",
     "x": "From slide  →  to slide  —  what the reader clicked\n1.  Home       →  Plant list   —  the My Plants button\n2.  Plant list →  Add plant    —  the + button\n3.  Home       →  Settings     —  the gear",
     "note": {
      "c": 3,
      "band": "Third",
      "s": "Three links where the brief asks for six, and the third one starts from a control that is not there. The Home screen in B6 has a tab bar of Home, Plants, Add and Profile — there is no gear on it. So the link either does not exist or lands from nowhere, and either way a marker clicking through stops here. Week 10 sets aside fifteen minutes to check exactly this, and the check was not done. \"Prototype incomplete or non-functional\" is the rubric's own wording for the band below this one; three links that mostly work is what keeps it out of it."
     }
    }
   ],
   "n": 18
  },
  {
   "kind": "divider",
   "blocks": [
    {
     "t": "h2",
     "x": "PART C — RATIONALE"
    }
   ],
   "n": 19
  },
  {
   "kind": "section",
   "sec": "C1",
   "blocks": [
    {
     "t": "h3",
     "x": "C1.  THEME & AUDIENCE"
    },
    {
     "t": "p",
     "x": "I chose a plant app because I like plants and I think other people like plants too. I wanted to make something that looks calm and modern so that people enjoy using it. My audience is anyone who owns houseplants and forgets to water them."
    }
   ],
   "n": 20
  },
  {
   "kind": "section",
   "sec": "C2",
   "blocks": [
    {
     "t": "h3",
     "x": "C2.  LAYOUT & HIERARCHY"
    },
    {
     "t": "p",
     "x": "I used a 12 column grid which is a standard grid that most designers use. This made my layouts look neat and organised. I put the most important things at the top so that users see them first, and I used white space to make it feel clean and uncluttered.",
     "note": {
      "c": 4,
      "band": "Third",
      "s": "\"Most designers use it\" is the only reason given, and it is a reason about other people. Nothing here cites A3 — and it could not, because A3 has blanks. This is the pattern across all of Part C: description without evidence, which the rubric places squarely in the third band."
     }
    }
   ],
   "n": 21
  },
  {
   "kind": "section",
   "sec": "C3",
   "blocks": [
    {
     "t": "h3",
     "x": "C3.  TYPOGRAPHY"
    },
    {
     "t": "p",
     "x": "I chose Montserrat for headings because it is bold and modern, and Open Sans for body text because it is easy to read. I also used Pacifico for my logo to add personality. The combination works well together and suits the calm feeling of my app."
    }
   ],
   "n": 22
  },
  {
   "kind": "section",
   "sec": "C4",
   "blocks": [
    {
     "t": "h3",
     "x": "C4.  COLOUR"
    },
    {
     "t": "p",
     "x": "I chose green as my main colour because green represents nature and plants. I used grey text so that it would not be too harsh against the white background, and a light green accent for buttons so they stand out.",
     "note": {
      "c": 2,
      "band": "Third",
      "s": "\"So it would not be too harsh\" is the student explaining, in their own words, why they made the text unreadable — and the figure that proves it is on page 2. A marker cannot ignore this: it is a colour decision made against the evidence the student themselves collected."
     }
    }
   ],
   "n": 23
  },
  {
   "kind": "section",
   "sec": "C5",
   "blocks": [
    {
     "t": "h3",
     "x": "C5.  USER NEEDS & ACCESSIBILITY"
    },
    {
     "t": "p",
     "x": "I made sure my app is easy to use by keeping the navigation simple and consistent on every screen. I used clear labels so users know what to do. Accessibility is important and I have thought about it throughout my design."
    }
   ],
   "n": 24
  },
  {
   "kind": "section",
   "sec": "C8",
   "blocks": [
    {
     "t": "h3",
     "x": "C8.  YOUR AI USE"
    },
    {
     "t": "p",
     "x": "I did not use any AI tools for this project. All of the work is my own.",
     "note": {
      "c": 4,
      "band": "Fail",
      "s": "C6 and C7 are not here at all — skip from C5 to C8 and look at the numbering. Both are required by the brief by name: one environmental, ethical or social dimension, and one cross-cultural consideration. Two required elements absent, plus an AI declaration the artefacts contradict, plus no references anywhere: Criterion 4 cannot rise above the third band whatever the prose is like."
     }
    }
   ],
   "n": 25
  }
 ],
 "criteria": [
  {
   "n": 1,
   "name": "Visual Design & Communication",
   "band": "2:2 · 50–59%",
   "mark": 50,
   "s": "The strongest part. There is a consistent visual language across five screens and a style tile that holds it together — the layouts are functional and considered. It is held at the bottom of the band by an incomplete grid specification, a type scale with no ratio or measure, and a responsive variant that is a scaled copy rather than a reflow."
  },
  {
   "n": 2,
   "name": "User-Centred Thinking",
   "band": "Third · 40–49%",
   "mark": 40,
   "s": "Basic acknowledgement of user needs and nothing more. Accessibility is asserted in C5 and evidenced nowhere: A6 is blank, and the contrast figures the student recorded themselves show body text at 3.45:1 and the accent at 1.75:1, both left uncorrected. The rubric's third band is \"some accessibility consideration but inconsistently applied\" — this is at the floor of it."
  },
  {
   "n": 3,
   "name": "Technical Craft & Process",
   "band": "Third · 40–49%",
   "mark": 44,
   "s": "Process artefacts are present but underdeveloped, which is the third band almost word for word. Two sketches, unlabelled wireframes, five screens where six to eight were asked for, and a click-through with three links instead of six — one of them starting from a control that is not on the screen. The deck is legible and reads as a whole, which keeps it in the band rather than below it."
  },
  {
   "n": 4,
   "name": "Critical Reflection",
   "band": "Third · 40–49%",
   "mark": 38,
   "s": "Descriptive throughout, with no reference to design principles, no citation of the student's own recorded values, and no reference list. Two required elements — the ethical or sustainability dimension and the cross-cultural consideration — are absent entirely. The AI declaration is contradicted by B4. This is the weakest criterion and the one that pulls the overall mark down."
  }
 ],
 "overall": "42 · Third. Everything the brief asks for is nominally present and almost none of it is evidenced — which is what makes this hard for a student to recognise in their own work. The portfolio is not empty; it is thin. The single most consequential fault is that the student measured their contrast, wrote the failing figures into A5, and changed nothing: the evidence of the problem and the failure to act on it are in the same deck.",
 "followup": "Before releasing a mark, the AI declaration must be raised with the student. A7 and C8 both say none; B4 does not look like none. That is a conversation, not an assumption — and it is a question about academic conduct rather than about the quality of the design."
};

/* ---------------------------------------------------------------------------
 * Week 10, on a slide: the same design, described and defended.
 *
 * C4 is the pair because it is the only rationale section where the student
 * already recorded real numbers — the 3.45:1 and 1.75:1 sitting unremarked in
 * A5. So the defended version invents nothing about this submission. It reads
 * the evidence the student collected and did not use, which is the point:
 * describing lets you walk past your own measurements, and defending does not.
 *
 * `described` is not written here. It is read out of the C4 slide at run time,
 * so the pair cannot drift from the portfolio it is a pair with.
 * ------------------------------------------------------------------------- */
EXAMPLE.defended = {
  sec: "C4",
  allowance: 90,
  criterion: 4,
  defended:
    "Five values: #FFFFFF and #F4F4F4 for surfaces, #8A8A8A for body text, #B4B4B4 for " +
    "secondary, and one accent, #7ED957. Green because the accent is the only saturated thing " +
    "on a screen of greys, so it carries the identity by itself. A5 records the measurements: " +
    "body 3.45:1 and accent 1.75:1 against white. WCAG 2.2 clause 1.4.3 asks 4.5:1 for text at " +
    "this size, so the body grey fails. Darkening it to #767676 gives 4.54:1 and holds the same " +
    "neutral. That change is not in this submission and should have been.",
  moves: [
    ["It names the values.",
     "Five hex codes instead of “green” and “grey”. Nothing else in the paragraph is possible until this happens."],
    ["It reads its own evidence.",
     "The figures were already in A5, two pages earlier, recorded by the student and never mentioned again. Defending the decision is what makes you go back and look."],
    ["It names the rule and the number.",
     "1.4.3, 4.5:1, and which way it fails. “Not too harsh” is a feeling; 3.45 against 4.5 is a fact a marker can check."],
    ["It names the fix, with its measurement.",
     "#767676 at 4.54:1. A claim someone can verify in thirty seconds, which is what makes it worth writing."],
    ["It admits what is still wrong.",
     "The last sentence is the one that turns a description into a defence, and it is the sentence students are most afraid to write."],
  ],
  unchanged:
    "Not one colour changed. The design in the defended paragraph is the same design, on the " +
    "same screens, with the same faults. Only the account of it changed.",
  reveal:
    "Critical Reflection is the lowest of the four criteria in this portfolio — 38, against 50 " +
    "for the visual work — and the marker's reason is a single word: descriptive. The student " +
    "did not lose those marks by designing badly. They lost them by writing the first paragraph " +
    "when the second one was available for the same effort and the same design.",
};
