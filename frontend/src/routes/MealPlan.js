import "../styles/MealPlan.css";
import lock from "../images/lock.png";
import { MPApi } from "../api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeSearch from "../components/RecipeSearch";
import Calendar from "../components/Calendar";
import ShowRecipe from "../components/ShowRecipe";
import { dietOptions, healthOptions } from '../helpers/constants';

const MealPlan = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [warningVisible, setWarningVisible] = useState(false);
    const [error, setError] = useState(
        "Meal plan creation failed for some reason."
    );

    const [formData, setFormData] = useState({});
    const [planID, setPlanID] = useState(null);
    const [dietTags, setDietTags] = useState([]);
    const [healthTags, setHealthTags] = useState([]);
    const [calData, setCalData] = useState({});
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");
    const [recipeURI, setRecipeURI] = useState("");
    const [recipeOpen, setRecipeOpen] = useState(false);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


    //can be called form sub-components to refresh the calendar info
    function refreshCal(){
        setCalData(planID);
    }

    function recipeSwitch(){
        setRecipeOpen(state => !state);
    }

    async function handleDelete(evt){
        const [success, error] = await MPApi.deleteMealPlan(planID);
        if (success){
            navigate("/profile");
        }
        //TODO, rework the error display for use with multiple error sources
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({
            ...data, //include all object properties
            [name]: value, //overide the target that was event triggered
        }));
    }
    

    function handlePreferenceClick(evt) {
        if (evt.target.checked) {
            var valueToAdd = evt.target.value;
            if (evt.target.name === "health") {
                setHealthTags((list) => [...list, valueToAdd]);
            } else {
                setDietTags((list) => [...list, valueToAdd]);
            }
        } else {
            var valueToDelete = evt.target.value;
            if (evt.target.name === "health") {
                setHealthTags((list) => {
                    var newList = list.filter((value) => {
                        return value !== valueToDelete;
                    });
                    return newList;
                });
            } else {
                setDietTags((list) => {
                    var newList = list.filter((value) => {
                        return value !== valueToDelete;
                    });
                    return newList;
                });
            }
        }
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        const [planid, error] = await MPApi.editMealPlan(
            formData,
            planID
        );
        if (!planid) {
            setWarningVisible(true);
            setError(error);
        } else {
            alert("saved");
            navigate(`/plan/${planid}`);
        }
    }

    //Populate form data
    useEffect(() => {
        async function getPlanData(planID) {
            const [plan, error] = await MPApi.getMealPlan(planID);
            console.log("The Plan is: ", plan);

            if (error) {
                setWarningVisible(true);
                setError(error);
            } else {
                setFormData({
                    label: plan.label,
                    description: plan.description,
                    // health_preferences : plan.health,
                    // diet_preferences : plan.diet
                });

                console.log("Diet tags: ", plan.diet);
                console.log("Health tags: ", plan.health);

                setDietTags(plan.diet);

                setHealthTags(plan.health);
            }
        }

        setPlanID(params.planID);
        getPlanData(params.planID);
        
    }, []);




    //when diet tags change, update form data
    useEffect(() => {
        setFormData((data) => ({
            ...data, //include all object properties
            diet_preferences: dietTags, //overide the diet array
        }));
    }, [dietTags]);





    //when health tags change, update form data
    useEffect(() => {
        setFormData((data) => ({
            ...data, //include all object properties
            health_preferences: healthTags, //overide the diet array
        }));
    }, [healthTags]);

    return (
        <main className="mealplan">
            <section id="plan-section">
                {warningVisible && <div className="reg-failure">{error}</div>}
                <h2>Edit Meal Plan</h2>
                <form onSubmit={handleSubmit} className="mealplan-form">
                    <label className="visually-hidden" htmlFor="label">
                        Plan name
                    </label>
                    <input
                        value={formData.label}
                        name="label"
                        id="label"
                        type="text"
                        placeholder="plan name"
                        onChange={handleChange}
                    />
                    <label className="visually-hidden" htmlFor="description">
                        description
                    </label>
                    <input
                        value={formData.description}
                        name="description"
                        id="description"
                        placeholder="description"
                        type="text"
                        onChange={handleChange}
                    />

                    <h4>Diet preferences</h4>
                    <div className="diet-options">
                        {dietOptions.map((option) => (
                            <div className="tag" key={"tag" + option}>
                                <input
                                    type="checkbox"
                                    name="diet"
                                    value={option}
                                    id={option}
                                    className="check-tag"
                                    onChange={handlePreferenceClick}
                                    checked={dietTags.includes(option)}
                                />
                                <label htmlFor={option} className="label-tag">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h4>Health and lifestyle preferences</h4>
                    <div className="health-options">
                        {healthOptions.map((option) => (
                            <div className="tag" key={"tag" + option}>
                                <input
                                    type="checkbox"
                                    name="health"
                                    value={option}
                                    id={option}
                                    className="check-tag"
                                    onChange={handlePreferenceClick}
                                    checked={healthTags.includes(option)}
                                />
                                <label htmlFor={option} className="label-tag">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-secondary" onClick={handleSubmit}>Save meal plan</button>
                </form>
                {!showDeleteButton && <button className="delete-meal-plan" onClick={()=>{setShowDeleteButton(true)}}><img src={lock} width="15px" alt="Click here to reveal delete button"/></button>}
                {showDeleteButton && <button className="delete-meal-plan" onClick={()=>{setShowDeleteConfirm(true)}}>Delete meal plan</button>}
                {
                    showDeleteConfirm &&
                    <div className="confirm-delete-plan">
                        <div className="inner-div">
                            <h3>Are you sure?</h3>
                            <p>Are you sure you want to delete this mealplan?
                                You will lose all associated calendar, diet 
                                tracking, and shopping list information. 
                            </p>
                            <button className="cancel-delete" onClick={()=>{setShowDeleteConfirm(false)}}>Opps, never mind!</button>
                            <button className="confirm-delete" onClick={handleDelete}>Yes, delete this plan</button>
                        </div>
                    </div>
                }
            </section>
            <section id="meal-section" >
                <div>
                    <h2>Calendar</h2>
                    <div className="window-container">
                        <Calendar calData={calData} planID={planID}/>
                    </div>
                </div>
                <div>
                    <h2>Search for meals to add</h2>
                    <RecipeSearch planID={planID} refreshCal={refreshCal} setRecipeURI={setRecipeURI} recipeSwitch={recipeSwitch}/>
                </div>
            </section>
            {
                recipeOpen &&
                <section className="recipe">
                    <div className="recipe-header">
                        <button className="recipe-close-button btn btn-secondary" onClick={recipeSwitch}>X</button>
                    </div>
                    <ShowRecipe uri={recipeURI} />
                </section>
            }
            
        </main>
    );
};

export default MealPlan;
