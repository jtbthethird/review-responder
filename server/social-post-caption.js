const OpenAI = require("openai-api");
require("dotenv").config();

const promptBase = `
Social Media Caption Generator
###
Business Name: The Nanny Smith
Description: When you choose a nanny for your child, you want to be sure that they’re dependable, fun, and someone you can trust. At the Nanny Smith, you’re guaranteed to find a sitter that checks all those boxes and more! Every member of our team must pass a thorough background check and be certified in CPR and first aid. Beyond that, we also cater to each family’s unique needs. We offer live-in and live-out care, full- and part-time availability, and a broad range of other specificities so parents can find the perfect fit for their little ones. Ready to get your search started? We can’t wait to meet you!
Captions:
1. Restless nights staying up with your little one are part of the package, but they don't have to last forever. Help is on the way! Visit www.nannysmith.com to learn more about our live-in nanny services. #thenannysmith #childcare #nanny #NewJersey #workingparent #parenthood
2. Everyone appreciates a homemade card, but why stop there? Visit https://www.easypeasyandfun.com/valentines-day-crafts-for-kids/ for fun Valentine's Day craft ideas for the whole family! #thenannysmith #childcare #nanny #NewJersey #workingfromhome #workingparent #parenthood
3. When you're working from home, you want to know that your kids are safe and entertained. Our nannies love cooking up fun with their littles! Visit www.nannysmith.com to learn more. #thenannysmith #childcare #nanny #NJ #workingfromhome #workingparent #mom #dad #kids #cooking
4. Whatever stage your child is at, our nannies can help with the learning process while they're in our care. #thenannysmith #childcare #nanny #NJ #virtuallearning #workingparent #toddlers #education #schoolage
5. Three things you can do for you and your kids to make coping through these times a little easier: lower your expectations, practice those basic self-care needs, and visit www.nannysmith.com for help. #thenannysmith #childcare #workingfromhome
###
Business Name: Sonoran Express Car Wash
Description: When life gets busy, you may not have any time to go get a car wash -- we get it. That’s why Sonoran Express Car Wash is the perfect solution. Our state-of-the-art, clean facility makes it so that you don’t even have to get out of your vehicle during its wash. We’re here to get things done well and done quickly, all in just a few seconds. If you ever need assistance, though, our knowledgeable, friendly team is around to help. You shouldn’t have to drive around in a dirty car just because you’re strapped for time, and that’s why we’re here.
Captions:
1. Dust, dirt, pollen, and more build up on your car's interior, making it imperative for a good wipe down. When was the last time you saw your interior sparkle?
2. You can always leave some rolls of dog waste bags in your car to keep your car trash free.
3. Forget chocolate and flowers! We think you should surprise your valentine with a clean car this week.
4. If you love a clean car as much as we do, stop on by!
5. We invest in good equipment because we're committed to a quality wash every time.
###
Business Name: Noble Tree Dates
Description: Our love affair with dates started in 1995, when Al Jalabi visited Saudi Arabia and brought some back home to Jacksonville. That same year, he began distributing five varieties to grocery stores, markets, and homes across the United States. From a healthy snack to innovative appetizers, dates are the versatile fruit you’ve been missing. Ours are grown in Saudi Arabia using thousand-year-old techniques -- just as nature intended. They’re non-GMO and always high-quality, with a taste that can’t be beat. We distribute to your favorite markets, but we can ship them directly to your home if you want to skip the rest of the produce section. The best part? All of our prices always include the cost of shipping. From our family to yours, you’ll want a second date as soon as you’re through with the first!
1. Sometimes it's good to think inside the box.
2. One date at a time.
3. Have you tried our dates yet? If so, which ones are your favorite? If you haven't tried our dates give us a visit, and we'll recommend you our favorites.
4. Picasso had his canvas and paints, but you should see what we can create with a few simple ingredients, including dates!
5. Dates with honey for dessert? If this isn't a match made in heaven, then we don't know what is.
###`;

const generateSocialPostCaptions = async ({
  businessName,
  businessDescription,
}) => {
  const promptAdd = `
Business Name: ${businessName}
Description: ${businessDescription}
1.`;

  const prompt = promptBase + promptAdd;

  const openai = new OpenAI(process.env.OPEN_AI_SECRET_KEY);

  console.log("Prompt Add: ", promptAdd);
  console.log("Full prompt: ", prompt);

  try {
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: prompt,
      maxTokens: 256,
      temperature: 0.8,
      topP: 1,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["\n###"],
    });

    console.log(gptResponse.data);

    const { choices } = gptResponse.data;
    if (choices && choices[0]) {
      console.log("Returning response: ", choices[0].text.trim());
      return "1. " + choices[0].text.trim();
    }
    return "Failed to get a response!";
  } catch (e) {
    console.log("OpenAI Error: ", e);
  }

  return "Error!";
};

exports.generateSocialPostCaptions = generateSocialPostCaptions;
