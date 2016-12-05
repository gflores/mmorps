var strongDamageAudio = new Audio("/audio/strong_damage.mp3");
var weakDamageAudio = new Audio("/audio/weak_damage.mp3");
var normalDamageAudio = new Audio("/audio/normal_damage.mp3");

export const getStrongDamageAudio = function(){
    console.log("getStrongDamageAudio");
    return strongDamageAudio;
}

export const getWeakDamageAudio = function(){
    console.log("getWeakDamageAudio");
    return weakDamageAudio;
}

export const getNormalDamageAudio = function(){
    console.log("getNormalDamageAudio");
    return normalDamageAudio;
}