xloads_ui - This is a frontend application for xloads project. It consumes these two java backend services:

1. `xloads_ui` https://github.com/slabiak/xloads_ui - This repo is a React app. It makes calls to backend services and provides UI.
2. `xloads_rest_proxy` https://github.com/slabiak/xloads_rest_proxy - This service is a Spring Boot Java app. It is some kind of proxy between UI and routing and place search services. For geocoding and place search autocomplete `nomatim` is used. For bike, walk, car routing requests `graphopper` is used. For public transportation routing requests `OpenTripPlanner` is used.

**Architecture diagram**:

<a href="https://github.com/slabiak/slabiak.github.io/blob/master/images/xloads_arhcitecture.jpg?raw=true"><img src="https://github.com/slabiak/slabiak.github.io/blob/master/images/xloads_arhcitecture.jpg?raw=true"></a>
