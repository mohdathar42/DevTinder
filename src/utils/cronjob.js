const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const  ConnectionRequestModel=require("../model/connectionRequest")

cron.schedule("0 8 * * *", async () => {
  //send email to all people who got request yesterday
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const pendingRequests = await ConnectionRequestModel
      .find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      })
      .populate("fromUserId toUserId");
    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];
    console.log(listOfEmails)
    for (const email of listOfEmails) {
      //send emails

      try {
        const res = await sendEmail.run(
          ` New Friend Request pending  for ${email}  there are so many friend request is pending please login to forkfriend  and accept or reject the request`
        );
        console.log(res);
      } catch (err) {
        console.error(`the error from email is    ${err}`);
      }
    }
  } catch (err) {
    console.error(`the error is from corn jobs is    ${err}`);
  }
});
