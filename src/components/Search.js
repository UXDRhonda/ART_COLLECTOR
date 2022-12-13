import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import { 
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults
} from '../api';

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
  const {setIsLoading, setSearchResults} = props;


  /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   * 
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */


  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   * 
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   * 
   * Make sure to console.error on caught errors from the API methods.
   */

   const [centuryList, setCenturyList] = useState([]);
   const [classificationList, setClassificationList] = useState([]);
   const [queryString, setQueryString] = useState('');
   const [century, setCentury ] = useState('any');
   const [classification, setClassification ] = useState('any');

   console.log(props);

   const handleQueryString = (event) => {
    setQueryString(event.target.value);
   }

   const handleClassification = (event) => {
    setClassification(event.target.value);
   }

   const handleCentury = (event) => {
    setCentury(event.target.value);
   }
  


   
  


  
   useEffect(() => {
    const PromiseArr = Promise.all([fetchAllCenturies(), fetchAllClassifications()])
    PromiseArr.then((value) => {
      try {
        console.log(value);
        setCenturyList(value[0]);
        setClassificationList(value[1]);
      } catch (error) {
        console.error(error);
      }
    })
}, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   * 
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   * 
   * then, in a try/catch/finally block:
   * 
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   * 
   * catch: error to console.error
   * 
   * finally: call setIsLoading, set it to false
   */
  return <form id="search" onSubmit={async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const fetchResult = fetchQueryResults({ century, classification, queryString });
      setSearchResults(fetchResult)
    }catch(error) {
      console.log(error);
    }
    setIsLoading(false)
    // write code here
  }}>
    <fieldset>
      <label htmlFor="keywords">Query</label>
      <input 
        id="keywords" 
        type="text" 
        placeholder="enter keywords..." 
        value={queryString} 
        onChange={handleQueryString}/>
    </fieldset>
    <fieldset>
      <label htmlFor="select-classification">Classification <span className="classification-count">({ classificationList.length })</span></label>
      <select 
        name="classification"
        id="select-classification"
        value= {classification} 
        onChange={handleClassification}>
        <option value="any">Any</option>
        {classificationList.map((classification) => {
          return <option key={classification.id}>{classification.name}</option>
        }) /* map over the classificationList, return an <option /> */}
      </select>
    </fieldset>
    <fieldset>
      <label htmlFor="select-century">Century <span className="century-count">({ centuryList.length })</span></label>
      <select 
             name="century"
             id="select-century"
             value={century}
             onChange={handleCentury}>
             <option value="any">Any</option>
             {centuryList.map((century) => {
               return <option key={century.id}>{century.name}</option>
           })
          /* map over the centuryList, return an <option /> */}
      </select>
     </fieldset>
    <button>SEARCH</button>
  </form>
}

export default Search;