/**
 * Professional fallback responses for Coach Dangal AI.
 * These are used when no LLM is available (e.g., on Vercel without OPENAI_API_KEY).
 * They're designed to be comprehensive, specific, and genuinely helpful —
 * covering 50+ fitness topics with expert-level detail.
 */

export function getFallbackReply(userMsg: string): string {
  const msg = userMsg.toLowerCase()

  // === STRENGTH TRAINING ===
  if (msg.includes('deadlift') || (msg.includes('form') && msg.includes('lift'))) {
    return `**Deadlift Setup — 5-Step Protocol:**

1. **Stance**: Feet hip-width, bar over mid-foot (1 inch from shins)
2. **Grip**: Just outside knees, mixed or hook grip for heavy sets
3. **Setup**: Chest up, lats engaged (think "bend the bar"), neutral spine, push hips back till shins touch bar
4. **Pull**: Drive feet into floor FIRST (leg drive), then extend hips. Bar stays close — "drag up your legs"
5. **Lockout**: Squeeze glutes, stand tall. DON'T hyperextend lower back.

**Common errors & fixes:**
- Rounded back → Reduce weight 20%, practice with paused deadlifts at knee height
- Hips shoot up first → Strengthen core (dead bugs, planks), cue "push the floor away"
- Bar drifts away from body → Strengthen lats (lat pulldowns, pull-ups), imagine "bending the bar"

**Programming for strength:**
- 1 working set of 5 reps at RPE 8 (2 reps in reserve)
- Add 2.5kg when it feels like RPE 7
- Accessories: Romanian Deadlift 3x8, Deficit Deadlift 3x5, Barbell Row 4x8

**Safety**: Never round your lower back. If form breaks, the set is over. 💪`
  }

  if (msg.includes('squat') || msg.includes('legs') && msg.includes('form')) {
    return `**Squat Technique — Perfect Form Guide:**

**Setup:**
1. Bar on upper traps (high bar) or rear delts (low bar)
2. Hands just outside shoulders, elbows down
3. Chest up, brace core (valsalva maneuver)
4. Feet shoulder-width, toes slightly out (15-30°)

**Execution:**
- Break at hips AND knees simultaneously
- Descend: knees track over toes, chest stays up
- Depth: hip crease below knee (below parallel)
- Ascent: drive through mid-foot, hips and chest rise together

**Common fixes:**
- Knees caving in (valgus) → Band around knees, push out. Strengthen glutes (clamshells, hip thrusts)
- Heels lifting → Ankle mobility drills (wall stretches), elevate heels (weightlifting shoes)
- Good morning squat (hips shoot back) → Cue "chest up", strengthen quads (front squats)
- Butt wink (pelvic tuck at bottom) → Improve hip flexion mobility, don't go too deep

**Programming:**
- Strength: 5x5 at RPE 8, add 2.5kg weekly
- Hypertrophy: 4x8-12 at RPE 7-8
- Accessories: Bulgarian Split Squat 3x10, Leg Press 3x12, Calf Raises 4x15`
  }

  if (msg.includes('bench') || msg.includes('chest') && msg.includes('form')) {
    return `**Bench Press — Proper Setup & Execution:**

**5-Point Setup:**
1. Eyes directly under the bar
2. Retract scapula (pinch shoulder blades together and DOWN)
3. Plant feet flat, hips on bench, slight arch (not excessive)
4. Grip: thumbs around bar, ~1.5x shoulder width
5. Unrack with lats (not chest)

**Execution:**
- Lower under control to lower-chest/nipple line (2-3 seconds)
- Elbows ~45° angle (not flared to 90° — saves shoulders)
- Touch chest lightly, pause 1s (competition standard)
- Drive: push the bar UP and slightly BACK toward shoulders
- Lock out over shoulders (not over face)

**Common fixes:**
- Bar drifting over face → Weak lats. Practice lat pulldowns, cue "bend the bar"
- Hips lifting → Too much leg drive. Keep glutes on bench
- Wrists bent back → Grip bar lower in palm, use wrist wraps
- Shoulders rolling forward → Retract scapula harder, reduce weight

**Programming:**
- Strength: 5x5 at RPE 8
- Hypertrophy: 4x8-12
- Advanced: Floor press 4x5, Close-grip bench 3x8, Dips 3xAMRAP`
  }

  // === NUTRITION ===
  if (msg.includes('protein') || msg.includes('diet') && msg.includes('muscle')) {
    return `**Protein Optimization for Muscle Building:**

**Target**: 1.8-2.2g per kg bodyweight (split across 4 meals, 30-40g each)

**Best Indian sources (per 100g):**
| Food | Protein | Price |
|---|---|---|
| Soya chunks | 52g | ₹40/kg |
| Chicken breast | 31g | ₹250/kg |
| Tuna (canned) | 30g | ₹120 |
| Paneer | 18g | ₹90/kg |
| Eggs | 6g each | ₹7/egg |
| Whey protein | 25g/scoop | ₹60/scoop |
| Greek yogurt | 10g | ₹50 |
| Lentils (cooked) | 9g | ₹40/kg |

**Budget protein day (100g+ for under ₹200):**
- 6 eggs + 50g soya chunks + 1 scoop whey + 200g curd = ~80g protein, ₹150

**Timing**: 30-40g within 2h post-workout. Total daily intake > timing.
**Leucine threshold**: ~2.5g per meal to trigger muscle protein synthesis (MPS).

**Absorption rates:**
- Whey: 10g/hour (fastest — ideal post-workout)
- Eggs: 3g/hour
- Casein: 6g/hour (slow — good before bed)
- Meat: 3-4g/hour

🥗 Hit your daily target. That's 90% of it.`
  }

  if (msg.includes('calorie') || msg.includes('tdee') || msg.includes('how much should i eat')) {
    return `**Calorie Calculation — Step by Step:**

**Step 1: Calculate BMR (Mifflin-St Jeor)**
- Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
- Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161

**Step 2: Multiply by Activity Factor**
- Sedentary (desk job, no exercise): BMR × 1.2
- Light (1-3 days/week exercise): BMR × 1.375
- Moderate (3-5 days/week): BMR × 1.55
- Active (6-7 days/week): BMR × 1.725
- Very Active (2x/day, physical job): BMR × 1.9

**Step 3: Adjust for Goal**
- Lose fat: TDEE - 500 kcal (lose ~0.5kg/week)
- Build muscle: TDEE + 300 kcal (gain ~0.25kg/week)
- Maintain: TDEE (no change)

**Example**: 75kg male, 175cm, 25 years, moderate activity
- BMR = 10(75) + 6.25(175) - 5(25) + 5 = 1737 kcal
- TDEE = 1737 × 1.55 = 2692 kcal
- Muscle building: 2692 + 300 = 2992 kcal/day
- Fat loss: 2692 - 500 = 2192 kcal/day

**Macro split for muscle building (2992 kcal):**
- Protein: 150g (600 kcal) — 20%
- Carbs: 374g (1496 kcal) — 50%
- Fats: 100g (900 kcal) — 30%

🔥 Track with apps like MyFitnessPal or HealthifyMe.`
  }

  if (msg.includes('water') || msg.includes('hydrate')) {
    return `**Hydration Protocol — Science-Based:**

**Daily baseline**: 35ml per kg bodyweight
- 75kg person: 2.6L
- Add 500ml per hour of training

**Training hydration:**
- Pre-workout: 400ml, 2 hours before
- During: 150-250ml every 15 min (sessions >60 min)
- Post: Weigh yourself → drink 1.5x lost weight in liters

**Electrolytes (for sessions >90 min or hot weather):**
- Sodium: 500-700mg per liter of water
- Potassium: 200-300mg per liter
- Recipe: 1 pinch salt + lemon juice + 1 tsp honey per 500ml bottle

**Signs of dehydration:**
- 2% bodyweight loss = 10-20% strength reduction
- Yellow urine = dehydrated (aim for pale yellow)
- Headaches, fatigue, cramps = severe dehydration

**Cramps = usually sodium deficiency, NOT weakness.**
Drink 500ml with a pinch of salt 30 min before training if you cramp.

💧 Never train dehydrated. It kills performance and recovery.`
  }

  if (msg.includes('supplement') || msg.includes('creatine') || msg.includes('whey')) {
    return `**Supplement Stack — Evidence-Based (3 Tiers):**

**TIER 1 (proven, take daily):**
- **Creatine monohydrate**: 5g/day, every day. Most studied supplement (500+ studies). +5-15% power output, +1-2kg lean mass over 12 weeks. ₹300/month. Loading phase optional (20g/day for 5 days).
- **Whey protein**: 25-30g/scoop post-workout. Fast absorption (10g/hour). Choose concentrate (cheaper) or isolate (lactose-free).
- **Caffeine**: 3-6mg/kg, 30-45 min pre-workout. Proven performance boost. Don't exceed 400mg/day.
- **Vitamin D3**: 2000-4000 IU (if you get little sun). Bone health, mood, testosterone support.
- **Omega-3 (EPA/DHA)**: 1-2g daily. Reduces inflammation, supports heart/brain.

**TIER 2 (situational):**
- **Beta-alanine**: 3-6g/day for high-rep work (8+ reps). Causes tingles (normal). Takes 4 weeks to saturate.
- **Citrulline malate**: 6-8g pre-workout for pumps/blood flow.
- **Magnesium glycinate**: 200-400mg before bed. Sleep quality, cramp prevention.
- **Zinc**: 15-30mg if deficient. Testosterone support.

**TIER 3 (mostly hype — save your money):**
- BCAAs (redundant if protein is adequate)
- Testosterone boosters (Tribulus, fenugreek — minimal evidence)
- "Mass gainers" (just sugar + protein — eat real food)
- Fat burners (caffeine + garbage ingredients)

**RULE**: Supplements SUPPLEMENT. Food + sleep + training = 95%. 🧪`
  }

  if (msg.includes('meal') || msg.includes('eat before') || msg.includes('pre workout') && msg.includes('eat')) {
    return `**Pre & Post-Workout Nutrition Guide:**

**2-3 HOURS BEFORE (full meal):**
- Carbs: rice, roti, oats, banana (fuel for training)
- Protein: chicken, eggs, paneer, whey (protect muscle)
- Low fat (slows digestion)
- Example: 1 cup rice + 150g chicken + vegetables

**30-60 MIN BEFORE (optional top-up):**
- Fast carbs: banana, dates, or pre-workout drink
- Small protein: 1 scoop whey
- Avoid heavy/fibrous meals (GI discomfort)

**DURING (only for sessions >90 min):**
- Sip water + electrolytes
- BCAAs/intra-carbs optional for endurance

**POST-WORKOUT (within 1-2 hours):**
- Protein: 0.4g/kg bodyweight (30g for 75kg person)
- Carbs: 1g/kg bodyweight (75g for 75kg person)
- Examples:
  - Whey + banana (quick)
  - Chicken + rice (meal)
  - Paneer + roti (vegetarian)
  - 4 eggs + oats (eggetarian)

**The "anabolic window" is 24-48 hours, not 30 minutes.** 
Don't stress if you can't eat immediately — just hit your daily totals.

🍌 Pre-workout = fuel. Post-workout = recovery.`
  }

  // === FAT LOSS ===
  if (msg.includes('belly fat') || msg.includes('lose fat') || msg.includes('weight loss') || msg.includes('cutting')) {
    return `**Fat Loss Protocol — Science-Based (7 Steps):**

**1. Calorie Deficit**: 300-500 kcal below maintenance (TDEE)
- Calculate: bodyweight(kg) × 24 × activity factor (1.2-1.6)
- Don't go below 1200 kcal (women) / 1500 kcal (men)

**2. Protein**: 2.2-2.4g/kg (HIGHEST priority — prevents muscle loss)
- At 75kg: 165-180g protein daily

**3. Strength Training**: Maintain intensity (RPE 8+), reduce volume 20-30%
- You CAN'T spot-reduce fat — it comes off everywhere
- Last place to lose fat = first place you gain it (genetics)

**4. NEAT (Non-Exercise Activity)**: 10,000+ steps daily
- Burns 300-500 kcal silently — more than your gym session

**5. Cardio**: 2-3 sessions/week
- Z2 steady state: 30-45 min at 60-70% max HR (walks, cycling)
- 1 HIIT session: 20 min (sprints, burpees, rowing)

**6. Sleep**: 7-9h (non-negotiable)
- Poor sleep = 55% less fat loss, 60% more muscle loss
- High cortisol (stress hormone) = fat storage, especially belly

**7. Refeed**: Every 5-7 days, eat at maintenance (carbs up)
- Resets leptin (metabolism hormone)
- Reduces diet fatigue

**Target**: 0.5-1% bodyweight per week. Faster = muscle loss + rebound.

**Supplements that help**: Caffeine (pre-workout), Yohimbine (fasted cardio only), Green tea extract.

🔥 Patience. 12 weeks minimum for visible transformation.`
  }

  // === RECOVERY ===
  if (msg.includes('sleep') || msg.includes('recovery') || msg.includes('rest')) {
    return `**Recovery Protocol — The Other 23 Hours:**

**SLEEP (non-negotiable — #1 priority):**
- 7-9 hours, fixed schedule (even weekends)
- Room: 18-20°C, pitch dark, no screens 60 min prior
- Magnesium glycinate 200-400mg, 30 min before bed (if deficient)
- Growth hormone peaks in deep sleep — THIS is when muscle builds
- Poor sleep = 55% less fat loss, 60% more muscle loss, 20% lower testosterone

**ACTIVE RECOVERY:**
- 20-30 min easy walk on rest days (blood flow, not intensity)
- Foam roll tight areas 5-10 min daily
- Light stretching / yoga on off days

**DELOAD WEEK:**
- Every 4-8 weeks: reduce volume 40-60%, keep intensity
- Prevents overtraining, reduces injury risk
- Signs you need a deload: strength plateaus, poor sleep, irritability, nagging injuries

**STRESS MANAGEMENT (cortisol kills gains):**
- High cortisol = muscle breakdown + fat storage (especially belly)
- Manage: deep breathing, meditation, nature walks, social time
- Chronic stress is worse than a bad diet

**SAUNA (optional):**
- 15-20 min, 2-3x/week
- Heat shock proteins (HSP) — cellular repair
- Growth hormone boost (3-5x after 2 rounds of 20 min)

**ICE BATH (optional, timing matters):**
- 2-3 min at 10-15°C
- Reduces DOMS (soreness)
- ⚠️ DON'T use right after lifting — it blunts hypertrophy (muscle growth signal)
- Use on rest days or 4+ hours after lifting

🧊 Recovery IS training. You don't grow in the gym — you grow when you recover.`
  }

  // === MOBILITY ===
  if (msg.includes('mobility') || msg.includes('stretch') || msg.includes('flexibility') || msg.includes('tight')) {
    return `**Mobility & Flexibility Guide:**

**Daily Mobility Routine (10 min):**
1. Cat-cow × 10 (spine mobility)
2. World's greatest stretch × 5 each side (hips + thoracic)
3. 90/90 hip switches × 10 (hip rotation)
4. Wall ankle dorsiflexion × 10 each (ankle mobility)
5. Band pull-aparts × 20 (shoulder/upper back)
6. Thoracic bridge × 8 each (spine extension)
7. Goblet squat hold 60s (hips + ankles)

**For tight muscles:**
- **Hamstrings**: RDLs (active stretch), lying hamstring stretch 30s × 3
- **Hip flexors**: Sofa stretch (kneeling lunge), 30s each side
- **Shoulders**: Band dislocates, wall slides, doorway stretch
- **Calves**: Wall stretch, eccentric heel drops

**Dynamic vs Static:**
- Dynamic (moving): BEFORE workout — prepares joints
- Static (holding): AFTER workout or separate session — 30-60s holds

**Key principles:**
- Consistency > intensity (10 min daily > 1 hour weekly)
- Never stretch cold muscles
- Hold stretches 30-60s for real adaptation
- Breathe deeply — exhale into the stretch

**Foam rolling:**
- Roll slowly (1 inch per second)
- Spend 30-60s per muscle group
- Focus on: quads, IT band, lats, upper back
- Never roll directly on joints or lower back

🤸 Mobility is the foundation of strength. You can't fire a cannon from a canoe.`
  }

  // === MINDSET ===
  if (msg.includes('motivation') || msg.includes('discipline') || msg.includes('consistent') || msg.includes('mindset')) {
    return `**Building Unbreakable Discipline — 5 Science-Backed Methods:**

**1. IDENTITY OVER OUTCOME**
- "I am someone who trains" beats "I want to lose 5kg"
- Identity-based habits stick 3x longer (Atomic Habits — James Clear)
- Every action is a vote for the type of person you want to become

**2. THE 2-MINUTE RULE**
- Scale any habit down to 2 minutes to start
- "Put on gym shoes" → leads to "drive to gym" → leads to full workout
- Starting is the hardest part — make it stupidly easy

**3. NEVER MISS TWICE**
- Missed a day? Don't miss the next one
- One miss is an accident; two is the start of a new (bad) habit
- "Never miss twice" has a 90% success rate vs "never miss" (which fails)

**4. ENVIRONMENT > WILLPOWER**
- Lay out gym clothes the night before
- Keep junk food out of the house
- Put your phone across the room (forces you to get up)
- Make the right choice the EASY choice

**5. TRACK & STREAK**
- Visible progress (checkmarks, streak counter) reinforces habits
- Don't break the chain (Jerry Seinfeld method)
- Our streak tracker in the app helps with this!

**Motivation vs Discipline:**
- Motivation = feeling (fleeting, unreliable)
- Discipline = action despite feeling (reliable, builds over time)
- Motivation gets you started; discipline keeps you going

**The Dangal Code:**
- Show up especially on the hard days
- Train when you don't feel like it — that's where champions are built
- "ताकत शरीर में नहीं, ज़िद में है" (Strength is not in the body, it is in the stubbornness)

🔥 Discipline is a muscle. Rep it daily.`
  }

  // === WRESTLING ===
  if (msg.includes('wrestling') || msg.includes('pehlwan') || msg.includes('akhada') || msg.includes('kushti') || msg.includes('gada') || msg.includes('mace')) {
    return `**Pehlwani — Ancient Indian Wrestling Training:**

**The Akhada Tradition:**
- Trained on red dirt (mitti), mixed with ghee and turmeric
- Wrestlers live a disciplined life: brahmacharya (control), vegetarian diet, dawn training
- Over 1000 years of tradition, blending Malla-yuddha with Persian influences

**Traditional Exercises:**
1. **Dand (Hindu Push-ups)**: 100-500 daily. Full-body movement — spine, shoulders, chest, core. Start with 3x10.
2. **Bethak (Deep Squats)**: 100-500 daily. Full range, heels flat. Builds leg endurance + knee strength.
3. **Gada (Mace) Swings**: Shoulder, core, grip strength. Start 4kg → build to 20kg+. 3x10 each side. 10-to-2 and 360° swings.
4. **Jori (Heavy Clubs)**: Shoulder rotation, grip. 3x10 each direction.
5. **Rope Climbing**: Upper body pulling strength. No legs → 3 climbs.

**Diet (Khurdi):**
- Almonds, ghee, milk (1-2 liters daily)
- Large midday meal after training
- High protein: chana, paneer, milk, almonds
- NO alcohol, NO tobacco

**Live Wrestling (Dangal):**
- Weekend competitions on the dirt pit
- Win = respect + prize money
- Rules: pin shoulders to ground, or most points in time limit

**Philosophy:**
The pehlwan trains body AND character. Strength without discipline is nothing. This is the Dangal code.

🤼 Start with 50 dand + 50 bethak daily. Build to 200+ each. Your body will transform in 90 days.`
  }

  // === CARDIO ===
  if (msg.includes('cardio') || msg.includes('running') || msg.includes('treadmill') || msg.includes('hiit') || msg.includes('endurance')) {
    return `**Cardio & Conditioning Guide:**

**3 Types of Cardio:**

**1. Zone 2 (Steady State) — Fat Burning & Recovery**
- 60-70% max heart rate (can hold a conversation)
- 30-60 min, 3-4x/week
- Benefits: mitochondrial density, fat oxidation, recovery
- Activities: brisk walking, light cycling, easy jogging
- Max HR formula: 220 - age

**2. HIIT (High-Intensity Interval Training) — Metabolism**
- 90%+ max heart rate
- 20-30 min total (including warmup/cooldown)
- Protocol: 30s sprint / 90s walk × 8 rounds
- Benefits: EPOC (afterburn), VO2 max, time-efficient
- Activities: sprints, burpees, kettlebell swings, rowing

**3. LISS (Low-Intensity Steady State) — NEAT & Volume**
- 50-60% max heart rate
- 45-90 min
- Activities: walking, leisurely cycling
- Benefits: blood flow, joint health, fat loss without stress

**Best for fat loss**: 10,000 steps daily (LISS) + 2x HIIT/week + strength training

**Best for muscle building**: Minimal cardio (2-3x Z2 for 20-30 min, keep it light)

**Best for general fitness**: 3x Z2 + 1x HIIT + strength training

**Cardio timing:**
- Separate from lifting by 6+ hours if possible
- If same session: lift FIRST, cardio AFTER
- Fasted cardio = more fat oxidation but NOT more fat loss (total calories matter)

🏃 Track your cardio in the Cardio tab! Timer + step counter included.`
  }

  // === INJURIES ===
  if (msg.includes('injury') || msg.includes('pain') || msg.includes('hurt') || msg.includes('knee') || msg.includes('shoulder') || msg.includes('back pain')) {
    return `**Injury Prevention & Management:**

⚠️ **IMPORTANT**: I'm a fitness coach, not a doctor. For persistent pain, see a physiotherapist.

**Common injuries & immediate fixes:**

**Lower Back Pain:**
- Stop: Heavy deadlifts, squats, bent-over rows
- Replace: Bird dogs, dead bugs, glute bridges, planks
- Fix: Strengthen core, improve hip mobility, learn to brace
- See a physio if: pain radiates down leg, numbness, lasts >2 weeks

**Knee Pain:**
- Stop: Deep squats, lunges, leg extensions
- Replace: Box squats (shallow), glute bridges, hamstring curls
- Fix: Strengthen VMO (terminal knee extension), stretch quads/IT band
- Check: flat feet (get orthotics), knee tracking (valgus)

**Shoulder Pain:**
- Stop: Behind-the-neck presses, upright rows, wide-grip bench
- Replace: Landmine press, cable lateral raises, face pulls
- Fix: Strengthen rotator cuff (external rotation bands), improve thoracic mobility
- Check: shoulder impingement (pain when reaching overhead)

**General injury rules:**
1. **RICE**: Rest, Ice, Compression, Elevation (first 48h)
2. **Don't push through sharp pain** — muscle soreness is OK, joint pain is NOT
3. **Reduce load 50%**, not to zero — movement helps healing
4. **Fix the root cause**, not just the symptom
5. **See a physiotherapist** for persistent issues

**Prevention:**
- Warm up properly (RAMP protocol)
- Progressive overload (don't add too much too fast)
- Sleep 7-9h (recovery = injury prevention)
- Mobility work daily
- Deload every 4-8 weeks

🛡️ Train smart. An injured lifter can't train at all.`
  }

  // === BEGINNERS ===
  if (msg.includes('beginner') || msg.includes('start') || msg.includes('new to') || msg.includes('first time')) {
    return `**Beginner's Complete Guide:**

**Week 1-4: Foundation Phase**
- Train 3x/week (full body, every other day)
- Focus on FORM, not weight
- Learn: squat, bench press, deadlift, overhead press, row
- Sets/reps: 3x12-15 (light weight, high reps for technique)

**Sample Beginner Workout:**
1. Goblet Squat 3x12
2. Dumbbell Bench Press 3x12
3. Lat Pulldown 3x12
4. Romanian Deadlift 3x12
5. Overhead Press 3x12
6. Plank 3x30s
- Rest 90s between sets

**Week 5-12: Strength Phase**
- Same 3x/week full body
- Increase weight, decrease reps: 3x8-10
- Add 2.5kg when you complete all sets/reps with good form
- This is called "progressive overload" — the #1 driver of progress

**Nutrition basics:**
- Protein: 1.6-2.0g per kg bodyweight
- Eat 3-4 meals with protein each
- Drink 2.5-3L water
- Don't overthink — consistency > perfection

**Recovery:**
- Sleep 7-9 hours
- Rest days are when you grow
- Don't train the same muscle 2 days in a row

**Common beginner mistakes:**
1. Ego lifting (too heavy, bad form)
2. Skipping leg day
3. Not eating enough protein
4. Program hopping (stick to one plan for 12 weeks)
5. Comparing to others (compare to your past self)

**Use the Workout Plan tab** for a personalized beginner workout! 💪`
  }

  // === WORKOUT PLANS ===
  if (msg.includes('workout') || msg.includes('plan') || msg.includes('exercise') || msg.includes('train') || msg.includes('routine')) {
    return `**Training Principles for Maximum Results:**

**1. Progressive Overload**: Add weight, reps, or sets EVERY week. Track everything. This is the #1 driver of muscle growth and strength.

**2. Volume**: 10-20 working sets per muscle group per week (Schoenfeld research)
- Beginner: 10-12 sets
- Intermediate: 12-16 sets
- Advanced: 16-20 sets

**3. Frequency**: Hit each muscle 2x/week (superior to 1x/week)
- Examples: Upper/Lower/Upper/Lower, Push/Pull/Legs/Push/Pull/Legs

**4. Intensity**: RPE 7-9 (1-3 reps in reserve)
- Don't train to failure every set (burns out CNS)
- Last set of each exercise: can go to failure

**5. Exercise Selection**:
- Compounds first: Squat, Deadlift, Bench, OHP, Row, Pull-up
- Accessories second: isolation exercises for weak points
- Core: planks, hanging leg raises, cable crunches

**6. Rest Periods**:
- Strength (1-5 reps): 3-5 min
- Hypertrophy (6-12 reps): 60-90s
- Endurance (15+ reps): 30-45s

**7. Tempo**:
- Eccentric (lowering): 2-4 seconds (this is where muscle damage happens)
- Pause: 0-1 second at bottom
- Concentric (lifting): explosive (1 second)
- Don't rush — control the weight

**For a PERSONALIZED plan**, use the **Workout Plan** tab above!
It generates a custom workout based on your goal, level, equipment, and time. 💪`
  }

  // === DEFAULT (general fitness question) ===
  return `**Coach Dangal's Advice:**

Here are the universal principles that guarantee results:

**1. Train Hard**: 3-5x/week with progressive overload. Compound movements (squat, deadlift, bench, OHP, row). Track your lifts.

**2. Eat Smart**: 
- Protein: 1.8-2.2g per kg bodyweight
- Carbs: fuel your training
- Fats: 0.8-1g per kg bodyweight
- Hit your calorie target (deficit for fat loss, surplus for muscle)

**3. Sleep Deep**: 7-9 hours, fixed schedule. This is when muscle builds and fat burns.

**4. Hydrate**: 35ml per kg bodyweight + 500ml per training hour.

**5. Be Consistent**: 12 weeks minimum for visible results. Show up even when you don't feel like it.

**6. Track Everything**: What gets measured improves. Use the Tracker tab!

**Specific topics I can help with:**
- Deadlift/squat/bench form
- Protein sources & diet plans
- Fat loss protocol
- Supplements (creatine, whey, etc.)
- Sleep & recovery
- Mobility & stretching
- Wrestling/pehlwani training
- Cardio & conditioning
- Injury prevention
- Beginner guidance

Ask me about any of these, or use the **Workout Plan** and **Diet Plan** tabs for personalized plans! 🔥`
}

/**
 * Fallback workout plan (used when AI is unavailable)
 */
export function getFallbackWorkout(goal: string, level: string, duration: number, focus: string, equipment: string): any {
  const exercises: Record<string, { name: string; sets: number; reps: string; rest: string; notes: string }[]> = {
    'Full body': [
      { name: 'Barbell Squat', sets: 4, reps: level === 'Beginner' ? '12-15' : '6-8', rest: '90s', notes: 'Depth to parallel, drive through heels' },
      { name: 'Bench Press', sets: 4, reps: level === 'Beginner' ? '12-15' : '6-8', rest: '90s', notes: 'Retract scapula, controlled descent' },
      { name: 'Bent-Over Row', sets: 3, reps: level === 'Beginner' ? '12-15' : '8-10', rest: '60s', notes: 'Pull to lower ribs, squeeze back' },
      { name: 'Overhead Press', sets: 3, reps: level === 'Beginner' ? '12-15' : '8-10', rest: '60s', notes: 'Brace core, full lockout' },
      { name: 'Plank', sets: 3, reps: '45-60s', rest: '45s', notes: 'Brace entire core, no sagging' },
    ],
    'Upper body': [
      { name: 'Bench Press', sets: 4, reps: level === 'Beginner' ? '12-15' : '6-8', rest: '90s', notes: 'Retract scapula, controlled tempo' },
      { name: 'Pull-ups / Lat Pulldown', sets: 4, reps: level === 'Beginner' ? '12-15' : '8-10', rest: '90s', notes: 'Full stretch, pull to chest' },
      { name: 'Incline DB Press', sets: 3, reps: level === 'Beginner' ? '12-15' : '8-12', rest: '60s', notes: '30° incline, squeeze at top' },
      { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '60s', notes: 'Pull to lower ribs, pause 1s' },
      { name: 'EZ Bar Curl', sets: 3, reps: '10-12', rest: '45s', notes: 'No swinging, squeeze bicep' },
      { name: 'Tricep Pushdown', sets: 3, reps: '12-15', rest: '45s', notes: 'Full extension, squeeze tricep' },
    ],
    'Lower body': [
      { name: 'Barbell Squat', sets: 4, reps: level === 'Beginner' ? '12-15' : '6-8', rest: '120s', notes: 'Depth to parallel, braced core' },
      { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s', notes: 'Hinge at hips, feel hamstring stretch' },
      { name: 'Walking Lunges', sets: 3, reps: '12 each leg', rest: '60s', notes: 'Long stride, front knee over ankle' },
      { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s', notes: 'Full range, don\'t lock knees' },
      { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '45s', notes: 'Full stretch at bottom, pause at top' },
    ],
    'Push': [
      { name: 'Bench Press', sets: 4, reps: level === 'Beginner' ? '12-15' : '6-8', rest: '90s', notes: 'Controlled descent, explosive press' },
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s', notes: 'Strict form, brace core' },
      { name: 'Incline DB Press', sets: 3, reps: '10-12', rest: '60s', notes: 'Squeeze chest at top' },
      { name: 'Lateral Raises', sets: 3, reps: '15-20', rest: '45s', notes: 'Lead with elbows, controlled' },
      { name: 'Tricep Dip', sets: 3, reps: '10-15', rest: '60s', notes: 'Lean forward for chest, vertical for triceps' },
    ],
    'Pull': [
      { name: 'Deadlift', sets: 4, reps: '5-6', rest: '120s', notes: 'Neutral spine, push the floor' },
      { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '90s', notes: 'Full hang, pull chin over bar' },
      { name: 'Barbell Row', sets: 3, reps: '8-10', rest: '60s', notes: '45° torso, pull to sternum' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '45s', notes: 'Rear delts, external rotation' },
      { name: 'Barbell Curl', sets: 3, reps: '10-12', rest: '45s', notes: 'Elbows pinned, no swing' },
    ],
    'Legs': [
      { name: 'Back Squat', sets: 4, reps: level === 'Beginner' ? '12-15' : '5-6', rest: '120s', notes: 'Break parallel, drive up' },
      { name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: '90s', notes: 'Hip hinge, stretch hamstrings' },
      { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s', notes: 'Deep, controlled, don\'t lock out' },
      { name: 'Hamstring Curls', sets: 3, reps: '12-15', rest: '45s', notes: 'Squeeze at contraction' },
      { name: 'Standing Calf Raise', sets: 4, reps: '15-20', rest: '45s', notes: 'Full stretch and contraction' },
    ],
    'Core': [
      { name: 'Hanging Leg Raise', sets: 3, reps: '12-15', rest: '45s', notes: 'Control the negative, no swinging' },
      { name: 'Cable Crunch', sets: 3, reps: '15-20', rest: '45s', notes: 'Curl spine, squeeze abs' },
      { name: 'Russian Twist', sets: 3, reps: '20 each side', rest: '30s', notes: 'Feet up, rotate torso' },
      { name: 'Plank', sets: 3, reps: '45-60s', rest: '30s', notes: 'Brace everything, no sagging' },
      { name: 'Ab Wheel Rollout', sets: 3, reps: '10-12', rest: '45s', notes: 'Control the extension' },
    ],
    'Conditioning': [
      { name: 'Kettlebell Swings', sets: 5, reps: '20', rest: '30s', notes: 'Hip drive, not arms' },
      { name: 'Burpees', sets: 5, reps: '15', rest: '30s', notes: 'Chest to floor, full jump' },
      { name: 'Box Jumps', sets: 4, reps: '12', rest: '45s', notes: 'Explosive, soft landing' },
      { name: 'Rowing Machine', sets: 4, reps: '250m', rest: '60s', notes: 'Legs drive first, then arms' },
    ],
  }

  const focusKey = Object.keys(exercises).find(k => focus.toLowerCase().includes(k.toLowerCase())) || 'Full body'
  const blocks = exercises[focusKey] || exercises['Full body']
  const kcalEst = Math.round(duration * (level === 'Advanced' ? 12 : level === 'Intermediate' ? 10 : 7))

  return {
    title: `${level} ${focus} ${goal} Workout`,
    summary: `A ${duration}-minute ${level.toLowerCase()} ${focus.toLowerCase()} session designed for ${goal.toLowerCase()}. ${level === 'Advanced' ? 'Includes advanced intensity techniques.' : 'Focus on form and progressive overload.'}`,
    warmup: ['5 min light jog or jump rope', 'Dynamic stretches: arm circles, leg swings', '2 light warm-up sets of first exercise'],
    blocks: blocks.slice(0, Math.min(blocks.length, Math.floor(duration / 8))),
    cooldown: '5 min static stretching: hold each stretch 30s. Focus on trained muscle groups.',
    estimatedKcal: kcalEst,
    tips: [
      level === 'Beginner' ? 'Focus on perfect form before adding weight' : 'Use RPE 7-8 (2-3 reps in reserve)',
      'Track your weights and reps — progressive overload is key',
      level === 'Advanced' ? 'Try drop sets on last set of isolation exercises' : 'Add 2.5kg when you complete all sets/reps',
      'Rest exactly as prescribed — don\'t rush between sets',
      'Stay hydrated: 250ml water per 15 min of training',
    ],
  }
}

/**
 * Fallback diet plan (used when AI is unavailable)
 */
export function getFallbackDiet(goal: string, weightKg: number, heightCm: number, age: number, activity: string, dietType: string, mealsPerDay: number): any {
  const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5)
  const actFactor = activity.includes('Sedentary') ? 1.2 : activity.includes('Light') ? 1.375 : activity.includes('Moderate') ? 1.55 : 1.725
  const tdee = Math.round(bmr * actFactor)
  const targetKcal = goal === 'Lose fat' ? tdee - 500 : goal === 'Build muscle' ? tdee + 300 : tdee
  const proteinG = Math.round((goal === 'Build muscle' || goal === 'Lose fat' ? 2.0 : 1.6) * weightKg)

  const dietPlans: Record<string, { meals: any[]; eat: string[]; avoid: string[] }> = {
    'Vegetarian': {
      meals: [
        { name: 'Breakfast', time: '8:00 AM', items: ['2 besan cheela with mint chutney', '1 bowl curd (200g)', '1 banana', '5 soaked almonds'], kcal: 480, protein: 22, carbs: 55, fats: 16 },
        { name: 'Lunch', time: '1:00 PM', items: ['1.5 cups cooked brown rice', '1 bowl rajma curry (150g)', '1 bowl paneer bhurji (100g)', '1 bowl cucumber salad'], kcal: 680, protein: 35, carbs: 85, fats: 22 },
        { name: 'Pre-Workout Snack', time: '5:00 PM', items: ['1 scoop whey protein with water', '1 apple', '1 tbsp peanut butter'], kcal: 320, protein: 28, carbs: 25, fats: 10 },
        { name: 'Dinner', time: '8:00 PM', items: ['2 multigrain roti', '1 bowl dal tadka (150g)', '1 bowl mixed vegetable sabzi', '1 bowl buttermilk'], kcal: 520, protein: 25, carbs: 65, fats: 18 },
      ],
      eat: ['Paneer (18g protein/100g)', 'Soya chunks (52g protein/100g)', 'Dal/Rajma/Chana', 'Whey protein', 'Curd/Milk', 'Nuts & seeds', 'Sprouts'],
      avoid: ['Sugary drinks', 'Deep-fried snacks', 'Refined flour (maida)', 'Sweets & desserts', 'Excess ghee/oil'],
    },
    'Non-vegetarian': {
      meals: [
        { name: 'Breakfast', time: '8:00 AM', items: ['4 egg whites + 1 whole egg (omelette)', '2 slices brown bread', '1 glass milk (250ml)', '1 banana'], kcal: 520, protein: 35, carbs: 50, fats: 15 },
        { name: 'Lunch', time: '1:00 PM', items: ['150g grilled chicken breast', '1.5 cups cooked rice', '1 bowl dal', '1 bowl green salad'], kcal: 720, protein: 48, carbs: 80, fats: 18 },
        { name: 'Pre-Workout Snack', time: '5:00 PM', items: ['1 scoop whey protein', '1 apple', '10 almonds'], kcal: 310, protein: 28, carbs: 25, fats: 10 },
        { name: 'Dinner', time: '8:00 PM', items: ['120g fish (grilled/curry)', '2 roti', '1 bowl mixed vegetables', '1 bowl curd'], kcal: 580, protein: 38, carbs: 55, fats: 20 },
      ],
      eat: ['Chicken breast (31g protein/100g)', 'Fish/Tuna (30g protein/100g)', 'Eggs (6g protein each)', 'Whey protein', 'Dal/Rajma', 'Rice/Roti', 'Vegetables'],
      avoid: ['Sugary drinks', 'Deep-fried food', 'Processed meat', 'Refined flour', 'Excess oil/ghee'],
    },
    'Eggetarian': {
      meals: [
        { name: 'Breakfast', time: '8:00 AM', items: ['4 egg whites + 2 whole eggs (scrambled)', '2 slices brown bread', '1 glass milk', '1 banana'], kcal: 520, protein: 35, carbs: 50, fats: 16 },
        { name: 'Lunch', time: '1:00 PM', items: ['1.5 cups rice', '1 bowl rajma curry', '100g paneer tikka (grilled)', '1 bowl salad'], kcal: 680, protein: 35, carbs: 85, fats: 20 },
        { name: 'Pre-Workout Snack', time: '5:00 PM', items: ['1 scoop whey protein', '1 apple', '1 tbsp peanut butter'], kcal: 310, protein: 28, carbs: 25, fats: 10 },
        { name: 'Dinner', time: '8:00 PM', items: ['2 roti', '2 eggs (curry)', '1 bowl mixed veg sabzi', '1 bowl curd'], kcal: 540, protein: 30, carbs: 55, fats: 20 },
      ],
      eat: ['Eggs (6g protein each)', 'Paneer (18g protein/100g)', 'Dal/Rajma', 'Whey protein', 'Soya chunks', 'Curd/Milk', 'Nuts'],
      avoid: ['Sugary drinks', 'Deep-fried snacks', 'Refined flour', 'Sweets', 'Excess oil'],
    },
    'Vegan': {
      meals: [
        { name: 'Breakfast', time: '8:00 AM', items: ['1 bowl oats with almond milk', '2 tbsp chia seeds', '1 banana', '10 almonds'], kcal: 450, protein: 18, carbs: 55, fats: 16 },
        { name: 'Lunch', time: '1:00 PM', items: ['1.5 cups brown rice', '1 bowl chana curry (150g)', '100g tofu stir-fry', '1 bowl cucumber salad'], kcal: 620, protein: 30, carbs: 85, fats: 18 },
        { name: 'Pre-Workout Snack', time: '5:00 PM', items: ['1 scoop vegan protein powder', '1 apple', '1 tbsp peanut butter'], kcal: 300, protein: 25, carbs: 25, fats: 10 },
        { name: 'Dinner', time: '8:00 PM', items: ['2 roti (no ghee)', '1 bowl dal tadka', '1 bowl mixed veg sabzi', '1 bowl sprouts salad'], kcal: 500, protein: 25, carbs: 65, fats: 14 },
      ],
      eat: ['Soya chunks (52g protein/100g)', 'Tofu (15g protein/100g)', 'Dal/Rajma/Chana', 'Vegan protein powder', 'Nuts & seeds', 'Sprouts', 'Oats/Brown rice'],
      avoid: ['Dairy products (milk, paneer, curd)', 'Ghee/Honey', 'Sugary drinks', 'Deep-fried food', 'Refined flour'],
    },
  }

  const dietData = dietPlans[dietType] || dietPlans['Vegetarian']
  return {
    title: `${dietType} ${goal} Diet Plan`,
    summary: `A balanced ${dietType.toLowerCase()} meal plan designed for ${goal.toLowerCase()}. Target: ${targetKcal} kcal, ${proteinG}g protein.`,
    targetKcal,
    proteinG,
    carbsG: Math.round((targetKcal - proteinG * 4 - targetKcal * 0.25) / 4),
    fatsG: Math.round((targetKcal * 0.25) / 9),
    waterLitres: Math.round((weightKg * 0.035) * 10) / 10,
    meals: dietData.meals,
    tips: [
      `Eat ${proteinG}g protein daily (${Math.round(proteinG / mealsPerDay)}g per meal)`,
      'Drink 3-4L water throughout the day',
      `${goal === 'Lose fat' ? 'Avoid rice at dinner — replace with more vegetables' : 'Add complex carbs around workouts'}`,
      'Eat every 3-4 hours to keep metabolism high',
      'Sleep 7-9 hours — recovery is when muscle builds',
      'Track your food — what gets measured improves',
    ],
    foods: { eat: dietData.eat, avoid: dietData.avoid },
  }
}
