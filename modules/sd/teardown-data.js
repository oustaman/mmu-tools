/* Week 1 · three live teardowns — the slide spec.
 *
 *  Editorial only. Which captured step to show, and what to say about it.
 *  The captures themselves and their provenance live in
 *  datasets/screens/flows/flows.json, and the corpus annotation fields there
 *  (reading_order, devices_used) stay null until a person fills them — a slide
 *  caption is a lecture note, not a corpus judgement, and the two must not be
 *  confused.
 *
 *  Every `img` is a path from this folder. check_teardowns.py verifies they
 *  all exist, so a re-capture that renumbers a step fails loudly.
 */
const FLOWDIR = 'datasets/screens/flows';

const TEARDOWNS = [

 {k:'title', n:'Three teardowns',
  h:'What do you read first?',
  lead:'Two real public services, walked end to end and photographed at every step. Neither is a mock-up and neither was chosen for being pretty.'},

 {k:'text', n:'The vocabulary',
  h:'Five devices, and that is the whole list.',
  lead:'A screen decides what you read first using <b>scale</b>, <b>weight</b>, <b>colour</b>, <b>space</b> and <b>position</b>. Nothing else. For every screen today, answer two questions in this order — <b>what did you read first</b>, and <b>which of the five did it</b>.',
  foot:'This is the language your rationale is written in. Section C2 asks you to justify your layout, and "it looks clean" is not an answer in it.'},

 {k:'flow', n:'Register to vote',
  h:'Register to vote',
  lead:'GOV.UK · 32 steps, start page to the moment before submission.',
  meta:'Crown copyright · Open Government Licence v3.0 · captured 1 September 2026',
  link:{href:'https://www.gov.uk/register-to-vote', text:'gov.uk/register-to-vote'}},

 {k:'shot', n:'Before the service starts', img:FLOWDIR+'/gov-rtv/01-start.webp',
  src:{url:'gov.uk/register-to-vote', live:'https://www.gov.uk/register-to-vote'},
  h:'A decision before you have started.',
  say:'The first thing between you and the service is a question about cookies. Look at the two buttons: <b>same size, same green, same weight</b>. Neither is nudged. Hold that thought — you will see the same choice made the same way on a retail site later, and it is rarer than it should be.',
  foot:'The green "Start now" button is further down this page, below the fold of the capture. What you are looking at is the whole of what a person meets first.'},

 {k:'shot', n:'One question per page', img:FLOWDIR+'/gov-rtv/05-where-do-you-live.webp',
  src:{url:'registertovote.service.gov.uk/country-of-residence',
       live:'https://www.gov.uk/register-to-vote', deep:false},
  h:'One question. Nothing else on the screen.',
  say:'A long form split so that no screen can be misread. The cost is 32 pages; the benefit is that no question is ever competing with another. <b>Space</b> is doing the work here — there is nothing to compete <em>with</em>.'},

 {k:'shot', n:'The exception path', img:FLOWDIR+'/gov-rtv/15-ni-cannot-provide.webp',
  src:{url:'registertovote.service.gov.uk/national-insurance-number',
       live:'https://www.gov.uk/register-to-vote', deep:false},
  h:'"I cannot provide my National Insurance number"',
  say:'The awkward case has a door. It is closed by default so it does not clutter the common path, and it opens to a box where you explain yourself. <b>Most designs forget this screen exists</b> — and it is the one a real person needs most.',
  foot:'I used this path in the walkthrough rather than invent a National Insurance number.'},

 {k:'shot', n:'Check your answers', img:FLOWDIR+'/gov-rtv/32-after-phone.webp',
  src:{url:'registertovote.service.gov.uk/check-your-answers',
       live:'https://www.gov.uk/register-to-vote', deep:false},
  h:'Everything you said, and a way to change each line.',
  say:'Thirteen answers collected over thirty pages, laid out in one column with <b>Change</b> beside every row. You can repair any single answer without walking the form again. <b>Position</b> is the device — the same word in the same place on every row.'},

 {k:'notice', n:'The notice',
  h:'And then, immediately above the button:',
  quote:'It is an offence to knowingly provide false information in an application for registration. If you do so, you could face an unlimited fine and/or go to prison for up to 51 weeks.',
  cite:'GOV.UK, Register to vote — check your answers page, captured 1 September 2026',
  say:'Not in the terms. Not on the start page thirty screens ago. <b>Here</b>, in bold, with a warning icon, as the last thing you read before you commit. The consequence is placed at the exact moment you can still act on it.',
  foot:'This is also why the walkthrough stopped at this screen and never pressed the button.'},

 {k:'flow', n:'Find a GP',
  h:'Find a GP',
  lead:'NHS · postcode, results, one provider, how to register.',
  meta:'© NHS England · captured 1 September 2026 · searched on E9 7HQ, the western tip of Victoria Park',
  link:{href:'https://www.nhs.uk/service-search/find-a-gp', text:'nhs.uk/service-search/find-a-gp'}},

 {k:'shot', n:'Results', img:FLOWDIR+'/nhs-gp/04-results.webp',
  src:{url:'nhs.uk/service-search/find-a-gp/results?location=E9 7HQ',
       live:'https://www.nhs.uk/service-search/find-a-gp/results?location=E9%207HQ'},
  h:'Two kinds of "near", and the difference matters.',
  say:'<b>GPs covering your postcode</b> is a different claim from <b>also nearby</b>, and the page says so with a heading rather than hoping you infer it. The green <b>Accepting new patients</b> chip is the only colour in the list, so it is what you see first.'},

 {k:'shot', n:'A live state', img:FLOWDIR+'/nhs-gp/05-provider-detail.webp',
  src:{url:'nhs.uk/services/gp-surgery/london-fields-medical-centre/XF84021',
       live:'https://www.nhs.uk/services/gp-surgery/london-fields-medical-centre/XF84021'},
  h:'"This GP surgery is currently closed."',
  say:'The screen knows what time it is. A state that changes through the day, shown at the top, before the address and the phone number you were about to use. Week 7 is entirely about screens like this one.'},

 {k:'flow', n:'A news front page',
  h:'A news front page',
  lead:'BBC News · the third teardown, and the purest hierarchy exercise there is.',
  meta:'© BBC · captured 1 September 2026 · teaching use only, not republished',
  link:{href:'https://www.bbc.co.uk/news', text:'bbc.co.uk/news'}},

 {k:'shot', n:'What is today about?', img:FLOWDIR+'/news-bbc/01-start.webp',
  src:{url:'bbc.co.uk/news', live:'https://www.bbc.co.uk/news'},
  h:'One glance tells you the lead story.',
  say:'Every headline here is the same colour and the same font. The lead wins on <b>scale</b> and <b>position</b> alone — bigger, and top-left, where a left-to-right reader starts. Cover the page and uncover it for a second: you will get the lead right every time.',
  foot:'Worth checking with a student: this page has no h1 at all. A screen reader user gets no "you are here". That is a fact you can verify, not a matter of taste.'},

 {k:'shot', n:'A decision above the price', img:FLOWDIR+'/shop-screwfix/02-consent-rejected.webp',
  src:{url:'screwfix.com/p/stanley-fatmax-5m-tape-measure/31529',
       live:'https://www.screwfix.com/p/stanley-fatmax-5m-tape-measure/31529'},
  h:'Collect or deliver, before you have decided to buy.',
  say:'The fulfilment choice sits <b>above</b> the add-to-basket button, not after it. <b>Position</b> is the whole argument: the shop has decided this question changes what you are buying, so it asks first. Most retailers bury it two screens into checkout.',
  foot:'This flow is incomplete in the corpus. Six of seven UK retailers refused automated capture outright; the basket and checkout screens were never reached, and finishing it needs a hand-driven pass.'},

 {k:'close', n:'Your turn',
  h:'Now do it to your own.',
  lead:'In week 9 you build six to eight screens, and in week 10 you link them into a click-through. A marker walks it exactly like we walked these two.',
  bullets:[
    'What do they read first on each screen, and which of the five devices did it?',
    'Where is your exception path — the screen for the person who cannot do the normal thing?',
    'Does anything in your flow tell someone what happens when they commit?'],
  foot:'Section B8 of your hand-in is the list of links. Six of them, and each one has to land.'}
];
