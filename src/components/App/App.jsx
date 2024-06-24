import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import { useEffect, useState } from "react";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback
    ? Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100)
    : 0;

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = function (feedbackType) {
    setFeedback(function (prevFeedback) {
      return {
        ...prevFeedback,
        [feedbackType]: prevFeedback[feedbackType] + 1,
      };
    });
  };

  const resetFeedback = function () {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback given" />
      )}
    </div>
  );
}

export default App;
