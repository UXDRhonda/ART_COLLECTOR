/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */
 import React from 'react';
 import { fetchQueryResultsFromURL } from '../api';


const Preview = (props) => {
  const{setSearchResults}=props;
  const{setFeaturedResult}=props;
  const{setisLoading}=props;
  const{info}=props.searchResults;
  const{records}=props.searchResults;
  /**
   * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
   * and also destructure info and records from props.searchResults
   * 
   * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
   */


  /**
   * Don't touch this function, it's good to go.
   * 
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <aside id="preview">
    <header className="pagination">
      {/*----Infinite Loop Buttons Below----*/}

      {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}

      <button 
        disabled={info?.prev===undefined} 
        className="previous"
        onClick={() => fetchPage(info.prev)}>Previous</button>
      
      {/*----Infinite Loop Button----*/}

      {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}

      <button
        disabled={info?.next===undefined}
        className="next"
        onClick={() => fetchPage(info.next)}>Next</button>
    </header>
    <section className="results">
      {
        records.map((record, index) =>{
          return <div
          key={index}
          className="object-preview"
          onClick={(event) => {
            event.preventDefault()
            setFeaturedResult(record)
          }}>{<img src={ record.primaryimageurl } alt={ record.description } />}{record.title &&<h3>{ record.title }</h3>}{<h3>MISSING INFO</h3>}</div>
        })

        /* Here we should map over the records, and render something like this for each one:
          <div  
            key={ index }
            className="object-preview"
            onClick={(event) => {
              // prevent the default
              // set the featured result to be this record, using setFeaturedResult
            }}>
            { 
              // if the record.primaryimageurl exists, show this: <img src={ record.primaryimageurl } alt={ record.description } />, otherwise show nothing 
            }
            {
              // if the record.title exists, add this: <h3>{ record.title }</h3>, otherwise show this: <h3>MISSING INFO</h3>
            }
          </div>
        */
      }
    </section>
  </aside>
}

export default Preview;