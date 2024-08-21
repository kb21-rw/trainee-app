import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode';
import { ApplicantDetails } from './types';
import { Cohort } from './types';

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

  const token =getJWT()

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


export const getApplicants = (data: ApplicantDetails[], dataItems: string[]) => {
  return data?.map((item: any) => dataItems.map(key => item[key as keyof ApplicantDetails]));
}


/**
 * Generates a random color and text color for a chart.
 *
 * @returns {Object} An object containing the background color and text color for the chart.
 * 
 */

export const getJWT = () => {
  const cookies = new Cookies();
  return cookies.get("jwt");
};

export const getRandomColorAndTextColor= () => {
   const skyBlueHue = 200;
   const saturation = 50;
   const lightness = 60;
 
   const backgroundColor = `hsl(${skyBlueHue}, ${saturation}%, ${lightness}%, 0.4)`;
   const textColor = "black";
 
   return { backgroundColor, textColor };
};


/**
 * Retrieves specific data items from each cohort in the provided data array.
 *
 * @param {Cohort[]} data - An array of cohort objects. Each object represents a cohort and contains various properties.
 * @param {string[]} dataItems - An array of strings representing the keys of the properties you want to extract from each cohort object.
 * 
 * @returns {Array<Array<any>>} - A two-dimensional array where each inner array contains the values corresponding to the keys specified in `dataItems` for each cohort object in `data`.
 *
 */

export const getCohorts = (data: Cohort[], dataItems: string[]) => {
  return data?.map((item: any) => dataItems.map(key => item[key as keyof Cohort]));
}