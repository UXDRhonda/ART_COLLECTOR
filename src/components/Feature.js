import React, { React.Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = ({ searchTerm, setIsLoading, setSearchResults, searchValue }) => {
  return <React.Fragment>
    <span className='title'>{searchTerm}</span>
    <span className='content'>
    <a href="#" onClick={async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try{
        const response = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
        setSearchResults(response);
      }catch(error){
        console.error(error); 
      }finally {
        setIsLoading(false);
      }
    }}>{searchValue}</a>
    </span>
  </React.Fragment>
  
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 * 
 * <main id="feature"></main>
 * 
 * And like this when one is:
 * 
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 * 
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style, 
 * technique, medium, dimensions, people, department, division, contact, creditline
 * 
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 * 
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 * 
 * This component should be exported as default.
 */
const Feature = ({featuredResult,setIsLoading,setSearchResults}) => {
  if(featuredResult) {
    return <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{featuredResult.title}</h3>
          <h4>{featuredResult.dated}</h4>
        </header>
        <section className="facts">
          <React.Fragment>
            <span className="title">Description</span>
            <span className="content">{featuredResult.description}</span>
          </React.Fragment>

          <React.Fragment>
            <span className="title">Style</span>
            <span className="content">{featuredResult.style}</span>
          </React.Fragment>

          <Searchable searchValue={featuredResult.culture} setSearchResult ={setSearchResults} setIsLoading={setIsLoading} searchTerm={"Culture"} />

          <Searchable searchValue={featuredResult.technique} setSearchResults={setSearchResults} setIsLoading={setIsLoading} searchTerm={"Technique"} />

          <Searchable searchValue={featuredResult.medium} setSearchResults={setSearchResults} setIsLoading={setIsLoading} searchTerm={"Medium"} />

          {featuredResult.people.map((person) => {
            return (<Searchable searchValue={person.displayname} setSearchResults={setSearchResults} setIsLoading={setIsLoading} searchTerm={"People"} />)
          })}

          <React.Fragment>
            <span className="title">Dimensions</span>
            <span className="content">{featuredResult.dimensions}</span>
          </React.Fragment>
          
          <React.Fragment>
            <span className="title">Department</span>
            <span className="content">{featuredResult.department}</span>
          </React.Fragment>

          <React.Fragment>
            <span className="title">Division</span>
            <span className="content">{featuredResult.division}</span>
          </React.Fragment>

          <React.Fragment>
            <span className="title">Contact</span>
            <span className="content">{featuredResult.contact}</span>
          </React.Fragment>

          <React.Fragment>
            <span className="title">Credit</span>
            <span className="content">{featuredResult.creditline}</span>
          </React.Fragment>

        </section>

        <section className="photos">
          {featuredResult.images.map((image) =>{
            console.log(image)
            return (
              <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
            )
          })}
        
        </section>
      </div>
    </main>
  }

}

export default Feature;