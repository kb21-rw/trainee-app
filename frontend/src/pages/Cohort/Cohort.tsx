import React, { useState } from "react"
import UserTableHeader from "../../components/ui/UserTableHeader"
import { cohortTableSortingValues, cohortsPerPage } from "../../utils/data"
import Button from "../../components/ui/Button"



const Cohort = () => {

    const [query, setQuery] = useState("")

    console.log(query)

  return (
    <div>
       <Button>
        Add trainee
      </Button>
      <UserTableHeader
        setQuery={setQuery}
        sortingValues={cohortTableSortingValues}
        usersPerPageValues={cohortsPerPage}
        userType="Trainee"
      />
    </div>
  )
}

export default Cohort
