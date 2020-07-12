function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function degtoRad(deg){
    return (deg * Math.PI) / 180;
}

let calculateBoundingBox = (coordinates,radius)=>{

    let R = 6371;  // earth radius in km
    
    let x1 = coordinates[0] - radians_to_degrees(radius/R/Math.cos(degtoRad(coordinates[1])));
    
    let x2 = coordinates[0] + radians_to_degrees(radius/R/Math.cos(degtoRad(coordinates[1])));
    
    let y1 = coordinates[1] + radians_to_degrees(radius/R);
    
    let y2 = coordinates[1] - radians_to_degrees(radius/R);

    return {x1:x1,x2:x2, y1:y1,y2:y2}
}


// 16 - lewo prawo ,lng
// point = lng, lat
// boundingBox = 

let isWithinBoundingBox = (bb, point)=>{
    if( bb.x1 <= point[0] && point[0] <= bb.x2 && bb.y2 <= point[1] && point[1] <= bb.y1) {
       return true;
    }
    return false;
}



export  {calculateBoundingBox, isWithinBoundingBox};