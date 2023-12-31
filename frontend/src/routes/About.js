export default function About(){
    return(
        <div className="story container" style={{textAlign: 'left'}}>
            <h1>About this project</h1>
            <p>
                In college I was great at databases, but not so great at coding.
                Back in those days creating web pages with HTML was called "scripting".
                Even JavaScript back then was considered only scripting -the equivalent
                to creating .bat files or other scripts for your operating system.
                It was limited and had no libraries for connecting to databases or anything
                beyond dynamically changing the color of text.  I used to dream of creating
                a grocery list, inventory, and recipe database, but I was limited to using
                what I knew back then, MS Access, which was great for small single user
                databases that managed your CD collection or comic books.
            </p>
            <p>
                Fast forward decades and several careers later, and here I am finally making 
                this dream come true thanks to the USF's Software Engineering bootcamp
                powered by rithmschool.  
            </p>
            <p>
                Feel free to create an account and try it out, but keep in mind that this is
                alpha software, not even beta.  I may still need to scrub the database from 
                time to time at this stage, so don't spend lots of time planning for the month.
                I would recommend only setting a weekly meal plan at most.  
            </p>    
            <p>
                You can create a 
                single meal plan for your family, or one for each member if you have people with
                unique requirements like mine. Search for meals to add to you calendar
                and access nutrition information and your shopping list based on what
                you have scheduled to prepare. There is even a link to the cooking 
                instructions for every meal.   
            </p>
            <p>
                I am very proud of this project and will continue to improve it in the 
                days to come.
            </p>
            <p className="signature">-The Webmaster</p>
            
        </div>
    )
}
