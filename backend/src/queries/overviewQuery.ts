import Form from "../models/Form";

export const getOverviewQuery = async (searchString: string) => {
  const overview = await Form.aggregate([
    {
      $match: { title: { $regex: new RegExp(searchString, "i") } },
    },
    {
      $lookup: {
        from: "questions",
        localField: "questionsId",
        foreignField: "_id",
        as: "questions",
      },
    },
    {
      $unwind: {
        path: "$questions",
      },
    },
    {
      $lookup: {
        from: "responses",
        localField: "questions.responseIds",
        foreignField: "_id",
        as: "responses",
      },
    },
    {
      $unwind: {
        path: "$responses",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "responses.userId",
        foreignField: "_id",
        as: "responses.user",
      },
    },
    {
      $unwind: {
        path: "$responses.user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "questions.responses.user.coach",
        foreignField: "_id",
        as: "responses.user.coach",
      },
    },
    {
      $unwind: {
        path: "$responses.user.coach",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        "responses.questionId": "$questions._id",
      },
    },
    {
      $group: {
        _id: "$_id",
        title: {
          $first: "$title",
        },
        description: {
          $first: "$description",
        },
        questionsId: {
          $first: "$questionsId",
        },
        createdAt: {
          $first: "$createdAt",
        },
        updatedAt: {
          $first: "$updatedAt",
        },
        questions: {
          $push: "$questions",
        },
        responses: {
          $push: "$responses",
        },
      },
    },
    {
      $set: {
        questions: {
          $setUnion: ["$questions"],
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        createdAt: 1,
        updatedAt: 1,
        questions: {
          $map: {
            input: "$questions",
            as: "question",
            in: {
              _id: "$$question._id",
              title: "$$question.title",
              type: "$$question.type",
              options: "$$question.options",
              createdAt: "$$question.createdAt",
              updatedAt: "$$question.updatedAt",
              responses: {
                $filter: {
                  input: "$responses",
                  as: "response",
                  cond: {
                    $eq: ["$$response.questionId", "$$question._id"],
                  },
                },
              },
            },
          },
        },
      },
    },
  ]);
  return overview;
};
