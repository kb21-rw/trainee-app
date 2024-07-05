import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode';

/**
 * Retrieves the logged-in user's information from a JWT token stored in cookies.
 * 
 * @returns {Object|undefined} The user information extracted from the JWT token, or `undefined` if no token is found.
 *  - The user information contains:
 * - The name of the user
 * - The email address of the user
 * - The role of the user
 * - The ID of the user
 * 
 */

export const getLoggedInUser = () => {
  const cookies = new Cookies()

  const token = cookies.get('jwt')

  if(!token) return

  const decoded = JSON.parse(JSON.stringify(jwtDecode(token)))

  const user = decoded.user || decoded

  return user
}

/**
 * Structures an array of data into a two-dimensional array containing information for each coach.
 *
 * @param {Array<Array<string>>} data - The input data in a two-dimensional array format.
 * @returns {Array<Array<string>>} - A two-dimensional array with coach information, each containing:
 *   - The coach's id
 *   - The coach's name
 *   - The coach's email
 *   - The coach's role
 */

export const getCoaches = (data: any[], dataItems: string[]) => {
  const currentUser = getLoggedInUser();
  const currentUserName = currentUser.name;
 
  const filteredCoachesData = data?.filter(coachData => coachData.name !== currentUserName);
 
  const coachesData = filteredCoachesData?.map(
     (coachData: any) =>
       dataItems?.map((dataItem: string) => coachData[dataItem]),
  );
 
  return coachesData;
 };

/**
 * getTraineesForCoach structures an array of data into a two-dimensional array containing information for each coach.
 *
 * @param {Array<Array<string>>} data - The input data in a two-dimensional array format.
 * @returns {Array<Array<string>>} - A two-dimensional array with coach information, each containing:
 *   - The trainee's id
 *   - The trainee's name
 *   - The trainee's email
 *   - The trainee's coach
 */
export const getTraineesForCoach = (data: any, dataItems: string[]) => {
  const traineesData = data?.map(
    (traineeData: any) =>
      dataItems?.map((dataItem: string) =>
        dataItem === "coach"
          ? traineeData?.coach?.name
          : dataItem === "coachId"
          ? traineeData?.coach?._id
          : traineeData[dataItem],
      ),
  );
  return traineesData;
};
/**
 * getTrainees structures an array of data into a two-dimensional array containing information for each coach.
 *
 * @param {Array<Array<string>>} data - The input data in a two-dimensional array format.
 * @returns {Array<Array<string>>} - A two-dimensional array with coach information, each containing:
 *   - The trainee's id
 *   - The trainee's name
 *   - The trainee's email
 *   - The trainee's coach
 */

export const getTrainees = (data: any, dataItems: string[]) => {
  const traineesData = data?.map(
    (traineeData: any) =>
      dataItems?.map((dataItem: string) =>
        dataItem === "coach"
          ? traineeData?.coach?.name || "No coach assigned"
          : dataItem === "coachId"
          ? traineeData?.coach?._id || ""
          : traineeData[dataItem],
      ),
  );
  return traineesData;
};

/**
 * Generates a random color and text color for a chart.
 *
 * @returns {Object} An object containing the background color and text color for the chart.
 * 
 */

export const getRandomColorAndTextColor = () => {
  const r = Math.floor(Math.random() * 100);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  const backgroundColor = `rgb(${r},${g},${b}, 0.4)`;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const textColor = luminance > 140 ? "black" : "white";
  return { backgroundColor, textColor };
};
