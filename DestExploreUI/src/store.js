import Vue from 'vue';
import Vuex from 'vuex';
import * as axios from "axios";
import { findClosestAirports } from "@/helpers/find_closest_airports"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    databaseOnline: true,
    showAbout: true,
    userLatLon: [],
    budget: 1200,
    airlineDisable: false,
    availability: {startDate:null, endDate:null},
    tripDuration: 3,
    tempControlOn: false,
    simpleTempRanges: {
      lowLow: 25,
      lowHigh: 50,
      midLow: 51,
      midHigh: 76,
      highLow: 77,
      highHigh: 102
    },

    userTempRange: {low:51, high: 76},

    activityOptions: {},
    selectedActivities: [],

    culinaryOptions: [],
    selectedFood: [],

    crimeRating: 1.5,
    // give data pre computed.
    airPorts: [],
    closestAirports: [],
    cities: [
      {
        code: "SFO",
        city: "San Francisco",
        country: "USA",
        lat: "37.7576793",
        lon: "-122.5076401",
        cost: 0
      },
      {
        code: "NYC",
        city: "New York",
        country: "USA",
        lat: "40.6971478",
        lon: "-74.2605541",
        cost: 3700.0
      },
      {
        code: "MCO",
        city: "Orlando",
        country: "USA",
        lat: "28.4810968",
        lon: "-81.5091793",
        cost: 2000.0
      },
      {
        code: "LAX",
        city: "Los Angeles",
        country: "USA",
        lat: "34.0201597",
        lon: "-118.6926093",
        cost: 700.0
      },
      {
        code: "PIT",
        city: "Pittsburg",
        country: "USA",
        lat: "40.4312835",
        lon: "-80.1209284",
        cost: 1700.0
      },
      {
        code: "SEA",
        city: "Seattle",
        country: "USA",
        lat: "47.6129428",
        lon: "-122.4824913",
        cost: 900.0
      },
      {
        code: "ANK",
        city: "Anchorage",
        country: "USA",
        lat: "61.1042033",
        lon: "-150.5639306",
        cost: 4000.0
      },
      {
        code: "HON",
        city: "Honolulu",
        country: "USA",
        lat: "21.3279755",
        lon: "-157.939503",
        cost: 4500.0
      },
      {
        code: "BLX",
        city: "Biloxi",
        country: "USA",
        lat: "30.4265027",
        lon: "-88.9958055",
        cost: 1200.0
      },
      {
        code: "BLD",
        city: "Boulder",
        country: "USA",
        lat: "40.0292887",
        lon: "-105.3101892",
        cost: 950.0
      },
      {
        code: "MIA",
        city: "Miami",
        country: "USA",
        lat: "25.7825453",
        lon: "-80.299499",
        cost: 3000.0
      },
      {
        code: "ALB",
        city: "Albany",
        country: "USA",
        lat: "42.6681893",
        lon: "-73.8807211",
        cost: 2700.0
      },
      {
        code: "AUS",
        city: "Austin",
        country: "USA",
        lat: "30.3080553",
        lon: "-98.0335947",
        cost: 1000
      },
      {
        code: "RAL",
        city: "Raleigh",
        country: "USA",
        lat: "35.843965",
        lon: "-78.7851415",
        cost: 3800.0
      }
    ],

    members: [
      {
        name: 'Fu, Yaoyao',
        info: 'Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \
        dolore eu fugiat nulla pariatur.'
      },
      {
        name: 'Hermez, Celestin',
        info: 'Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \
        dolore eu fugiat nulla pariatur.'
      },
      {
        name: 'Paul, Deborah',
        info: 'Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \
        dolore eu fugiat nulla pariatur.'
      },
      {
        name: 'Schultz, Chris',
        info: 'Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \
        dolore eu fugiat nulla pariatur.'
      },
      {
        name: 'Weber, Dan',
        info: 'Lorem ipsum dolor sit amet, \
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut \
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud \
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum \
        dolore eu fugiat nulla pariatur.'
      }

    ],
    docs: [
      {
        name: 'Proposal Doc',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
      {
        name: 'Proposal Presentation',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
      {
        name: 'Proposal Video',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
      {
        name: 'Progress Report',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
      {
        name: 'Final Poster',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
      {
        name: 'Final Report',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
      {
        name: 'Code Repository',
        link: 'https://docs.google.com/document/d/1TmquQqko-nLgNKJWSchAl_zO-SxK1tsIuStV22CSwu8/edit'
      },
    ]

  },
  mutations: {
    databaseOnlineStatus(state, payload) {
      state.databaseOnline = payload
    },

    showHideAboutMutation(state, payload) {
      state.showAbout = payload;
    },

    setUserLatLon(state, payload) {
      state.userLatLon = payload
    },

    setBudgetMutation(state, payload) {
      state.budget = payload
    },

    setAirlineDisableMutation(state, payload) {
      state.airlineDisable = payload
    },

    setAvailabilityMutation(state, payload){
      state.availability = payload
    },

    setTripDurationMutation(state, payload){
      state.tripDuration = payload
    },

    setEnableWeatherMutation(state, payload) {
      state.tempControlOn = payload
    },

    setUserTempRangeMutation(state, payload){
      state.userTempRange = payload
    },

    setselectedActivitiesMutation(state, payload){
      state.selectedActivities = payload
    },

    setSelectedCulinaryMutation(state, payload){
      state.selectedFood = payload
    },

    setCrimeRatingMutation(state, payload){
      state.crimeRating = payload
    },

    setAirports(state, payload) {
      state.airPorts = payload
    },

    setClosestAirports(state, payload) {
      var closestAirports = findClosestAirports(payload, state.airPorts, 5, 1000)
      state.closestAirports = closestAirports
    },

    setActivities(state, payload){
      var activity_category
      var processed_activities = {}
      payload.forEach((activity) => {
        activity_category = activity.category_activity
        if( activity_category in processed_activities) {
          processed_activities[activity_category].push(activity.activity_name)
        }
        else{
          processed_activities[activity_category] = [activity.activity_name]
        }
        
      })
      state.activityOptions = processed_activities
      
    },

    setCuisineOptionsMutation(state, payload){
      var collectedFood = []
      payload.forEach((cuisine) => {
        collectedFood.push(cuisine.cuisine)
      })
      state.culinaryOptions = collectedFood
    }
  },
  actions: {
    showHideAboutAction(context, payload) {
      context.commit('showHideAboutMutation', payload);
    },

    setStartingLocation(context, payload) {
      context.commit('setUserLatLon', payload)
    },

    setBudgetAction(context, payload) {
      context.commit('setBudgetMutation', payload);
    },

    setAirlineDisable(context, payload){
      context.commit('setAirlineDisableMutation', payload);
    },

    async getAllAirports(context) {
      try {
        const response = await axios.get('http://localhost:3000/airports');
        var good_data = []
        response.data.forEach((aport) => {
          if (aport.iata_code !== "\\N") {
            good_data.push(aport)
          }
        })
        context.commit('setAirports', good_data);

      } catch (error) {
        context.commit('databaseOnlineStatus', false);
      }
    },

    async getAllActivities(context) {
      try {
        const response = await axios.get('http://localhost:3000/activity');
        context.commit('setActivities', response.data);

      } catch (error) {
        context.commit('databaseOnlineStatus', false);
      }
    },

    async getAllCuisine(context) {
      try {
        const response = await axios.get('http://localhost:3000/cuisine');
        context.commit('setCuisineOptionsMutation', response.data);

      } catch (error) {
        context.commit('databaseOnlineStatus', false);
      }
    },

    setAvailability(context, payload) {
      context.commit('setAvailabilityMutation', payload)
    },

    setTripDuration(context, payload) {
      context.commit('setTripDurationMutation', payload)
    },

    setEnableWeather(context, payload){
      context.commit('setEnableWeatherMutation', payload);
    },

    setUserTempRange(context, payload) {
      context.commit('setUserTempRangeMutation', payload)
    },

    setSelectedActivities(context, payload) {
      context.commit('setselectedActivitiesMutation', payload)
    },

    setSelectedCulinary(context, payload) {
      context.commit('setSelectedCulinaryMutation', payload)
    },

    setCrimeRating(context, payload) {
      context.commit('setCrimeRatingMutation', payload)
    },

    getClosestAirports(context, payload) {
      context.commit('setClosestAirports', payload)
    }
  },
});
