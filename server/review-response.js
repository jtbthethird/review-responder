const OpenAI = require("openai-api");
require("dotenv").config();

const promptBase =
  "Review Response Generator\n###\n" +
  "Business: SmoothGinger Smoothie N Ginger Juice Bar\n" +
  "Vertical: Restaurant\n" +
  "Signoff: Takala, Owner\n" +
  "Stars: 5\n" +
  "Reviewer: Antoinette R.\n" +
  "Review: I absolutely love Smooth Ginger! Just recently my daughter was in the process of having an asthma attack. She had just been exposed to a baby that tested positive for the Covid. Once her wheezing began, Ms. Smooth Ginger supplied my daughter with Elderberry Syrup, Ginger Juice, Lungsworth and Fevergrass Tea. I made the prepared by Smooth Ginger teabags as instructed and she began drinking it all the way to hospital and finished by the time of triage. Just that fast her wheezing was gone and she was feeling 80% better within a hour of consuming the products supplied! I can't thank you enough for not just the products but for you personally educating me towards a healthier living!\n" +
  "Response: Antoinette, I'm so happy to hear your daughter is feeling better! It's such a joy to share the benefits of natural products with our community, and stories like this are the reason we love what we do. I wish your daughter a speedy recovery, and I'd love to see you both in the future. Warm wishes, Takala, Owner\n" +
  "###\n" +
  "Business: Burst Of Butterflies Create & Paint Studio - Tempe\n" +
  "Vertical: Activities and Events\n" +
  "Signoff: Cheryl T., Owner\n" +
  "Stars: 4\n" +
  "Reviewer: Megan Cave\n" +
  "Review: \n" +
  "Response: We're so happy you had a great visit, Megan! We'd love to welcome you back again. -Cheryl T., Owner\n" +
  "###\n" +
  "Business: Takashi Bistro\n" +
  "Vertical: Restaurant\n" +
  "Signoff: Lorena L., Manager\n" +
  "Stars: 2\n" +
  "Reviewer: Vanessa F.\n" +
  "Review: I absolutely love the food here, especially the stir fried noodles, but every time we order food from this restaurant, our order is always wrong! We just recently picked up our order of 2 avocado salmon rolls, one monster roll, 5 California rolls and a few other things. We received the incorrect type of salmon rolls with no avocado and are missing our monster roll. We also did not receive one of our California rolls. This has happened multiple times. Additionally, we were still charged the same amount for our order, even though we did not receive most of it. I love the food, but I think the order system needs to be fixed.\n" +
  "Response: It's concerning you haven't been getting your total order, Vanessa, because we always want to make sure we get things right. If you have more specifics about how you've been ordering with us, please reach out directly so we can work together to correct this. Kindly, Lorena L., Manager\n" +
  "###\n";

const generateReviewResponse = async ({
  businessName,
  reviewText,
  vertical,
  signoff,
  reviewer,
  stars,
}) => {
  const promptAdd =
    `Business: ${businessName.trim()}\n` +
    `Vertical: ${vertical.trim()}\n` +
    `Signoff: ${signoff.trim()}\n` +
    `Stars: ${stars}\n` +
    `Reviewer: ${reviewer.trim()}\n` +
    `Review: ${reviewText.trim()}\n` +
    "Response:";

  const prompt = promptBase + promptAdd;

  const openai = new OpenAI(process.env.OPEN_AI_SECRET_KEY);

  console.log("Prompt Add: ", promptAdd);
  console.log("Full prompt: ", prompt);

  try {
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: prompt,
      maxTokens: 256,
      temperature: 0.3,
      topP: 1,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["\n", "\n###"],
    });

    console.log(gptResponse.data);

    const { choices } = gptResponse.data;
    if (choices && choices[0]) {
      console.log("Returning response: ", choices[0].text.trim());
      return choices[0].text.trim();
    }
    return "Failed to get a response!";
  } catch (e) {
    console.log("OpenAI Error: ", e);
  }

  return "Error!";
};

exports.generateReviewResponse = generateReviewResponse;
