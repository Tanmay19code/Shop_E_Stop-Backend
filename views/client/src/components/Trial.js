import React from "react";
import laptop from "../sampleData/laptop.js";

function Trial() {
  return (
    <div className="page-container">
      {laptop.map((element) => {
        return (
          <>
            <p>
              {element.image_url.map((img) => {
                return <p>{img.image}</p>
              })}
              {/* {element.specifications.map((spec) => {
                
                  // spec.map((gen) => {
                    return <p>{spec.additionalFeatures}</p>;
                  // });
                
              })} */}
            </p><br/>

            {/* {element.highlights.map((e) => {
              return <>
              {
                e.highlight4.map((high) => {
                  return <p>{high.one}</p>
                })
              }
              </>;
            })} */}
          </>
        );
      })}
    </div>
  );
}

export default Trial;
