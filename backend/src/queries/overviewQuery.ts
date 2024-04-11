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
      $lookup: {
        from: "users",
        localField: "responses.userId",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "users.coach",
        foreignField: "_id",
        as: "coaches",
      },
    },
    {
      $addFields: {
        users: {
          $map: {
            input: "$users",
            as: "user",
            in: {
              $mergeObjects: [
                "$$user",
                {
                  coach: {
                    $arrayElemAt: [
                      "$coaches",
                      {
                        $indexOfArray: ["$users", "$$user.coach"],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        responses: {
          $cond: {
            if: {
              $gt: [
                {
                  $size: "$users",
                },
                0,
              ],
            },
            then: {
              $map: {
                input: "$responses",
                as: "response",
                in: {
                  $mergeObjects: [
                    "$$response",
                    {
                      user: {
                        $arrayElemAt: [
                          "$users",
                          {
                            $indexOfArray: ["$responses", "$$response"],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
            else: "$responses",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          title: "$title",
          description: "$description",
        },
        questions: {
          $push: {
            _id: "$questions._id",
            title: "$questions.title",
            type: "$questions.type",
            options: "$questions.options",
            responses: "$responses",
          },
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        title: "$_id.title",
        description: "$_id.description",
        "questions._id": 1,
        "questions.title": 1,
        "questions.type": 1,
        "questions.options": 1,
        "questions.responses": 1,
      },
    },
  ]);
  return overview;
};
