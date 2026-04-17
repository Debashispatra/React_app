let feedbackStore = [];

export async function submitFeedback(formData) {
  const name = formData.get("name");
  const message = formData.get("message");
  const rating = formData.get("rating");

  const newFeedback = {
    id: Date.now(),
    name,
    message,
    rating,
  };

  feedbackStore.push(newFeedback);

  return {
    success: true,
    data: newFeedback,
  };
}

export function getFeedbacks() {
  return feedbackStore;
}