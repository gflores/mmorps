var strongDamageAudio = new Audio("/audio/strong_damage.mp3");
var weakDamageAudio = new Audio("/audio/weak_damage.mp3");
var normalDamageAudio = new Audio("/audio/normal_damage.mp3");

export const getStrongDamageAudio(){
    return strongDamageAudio;
}

export const getWeakDamageAudio(){
    return weakDamageAudio;
}

export const getNormanDamageAudio(){
    return normalDamageAudio;
}