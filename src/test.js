import { io } from "socket.io-client";

const url = 'ws://localhost:8080';
const ws = io(url);

// const routePoints = [
//     { "latitude": -23.4065877, "longitude": -46.8780976 },
//     { "latitude": -23.406639376271187, "longitude": -46.87760013220338 },
//     { "latitude": -23.40669105254237, "longitude": -46.87710266440678 },
//     { "latitude": -23.40674272881356, "longitude": -46.876605196610164 },
//     { "latitude": -23.406794405084746, "longitude": -46.87610772881356 },
//     { "latitude": -23.40684608135593, "longitude": -46.875610261016945 },
//     { "latitude": -23.406897757627117, "longitude": -46.87511279322034 },
//     { "latitude": -23.406949433898305, "longitude": -46.874615325423726 },
//     { "latitude": -23.407001110169492, "longitude": -46.87411785762712 },
//     { "latitude": -23.407052786440676, "longitude": -46.873620389830506 },
//     { "latitude": -23.407104462711864, "longitude": -46.87312292203389 },
//     { "latitude": -23.40715613898305, "longitude": -46.87262545423729 },
//     { "latitude": -23.407207815254235, "longitude": -46.872127986440674 },
//     { "latitude": -23.407259491525423, "longitude": -46.87163051864407 },
//     { "latitude": -23.40731116779661, "longitude": -46.871133050847455 },
//     { "latitude": -23.407362844067794, "longitude": -46.87063558305085 },
//     { "latitude": -23.407414520338982, "longitude": -46.870138115254235 },
//     { "latitude": -23.40746619661017, "longitude": -46.86964064745762 },
//     { "latitude": -23.407517872881357, "longitude": -46.869143179661016 },
//     { "latitude": -23.40756954915254, "longitude": -46.8686457118644 },
//     { "latitude": -23.40762122542373, "longitude": -46.8681482440678 },
//     { "latitude": -23.407672901694916, "longitude": -46.867650776271184 },
//     { "latitude": -23.4077245779661, "longitude": -46.86715330847458 },
//     { "latitude": -23.407776254237287, "longitude": -46.866655840677964 },
//     { "latitude": -23.407827930508475, "longitude": -46.86615837288136 },
//     { "latitude": -23.40787960677966, "longitude": -46.865660905084745 },
//     { "latitude": -23.407931283050846, "longitude": -46.86516343728813 },
//     { "latitude": -23.407982959322034, "longitude": -46.864665969491526 },
//     { "latitude": -23.408034635593218, "longitude": -46.86416850169491 },
//     { "latitude": -23.408086311864405, "longitude": -46.86367103389831 },
//     { "latitude": -23.408137988135593, "longitude": -46.86317356610169 },
//     { "latitude": -23.40818966440678, "longitude": -46.86267609830509 },
//     { "latitude": -23.408241340677964, "longitude": -46.862178630508474 },
//     { "latitude": -23.408293016949152, "longitude": -46.86168116271187 },
//     { "latitude": -23.40834469322034, "longitude": -46.861183694915255 },
//     { "latitude": -23.408396369491523, "longitude": -46.86068622711864 },
//     { "latitude": -23.40844804576271, "longitude": -46.860188759322035 },
//     { "latitude": -23.4084997220339, "longitude": -46.85969129152542 },
//     { "latitude": -23.408551398305082, "longitude": -46.859193823728816 },
//     { "latitude": -23.40860307457627, "longitude": -46.8586963559322 },
//     { "latitude": -23.408654750847457, "longitude": -46.8581988881356 },
//     { "latitude": -23.40870642711864, "longitude": -46.857701420338984 },
//     { "latitude": -23.40875810338983, "longitude": -46.85720395254238 },
//     { "latitude": -23.408809779661016, "longitude": -46.856706484745764 },
//     { "latitude": -23.408861455932204, "longitude": -46.85620901694915 },
//     { "latitude": -23.408913132203388, "longitude": -46.855711549152545 },
//     { "latitude": -23.408964808474575, "longitude": -46.85521408135593 },
//     { "latitude": -23.409016484745763, "longitude": -46.854716613559326 },
//     { "latitude": -23.409068161016947, "longitude": -46.85421914576271 },
//     { "latitude": -23.409119837288134, "longitude": -46.85372167796611 },
//     { "latitude": -23.409171513559322, "longitude": -46.85322421016949 },
//     { "latitude": -23.409223189830506, "longitude": -46.85272674237288 },
//     { "latitude": -23.409274866101693, "longitude": -46.852229274576274 },
//     { "latitude": -23.40932654237288, "longitude": -46.85173180677966 },
//     { "latitude": -23.40937821864407, "longitude": -46.851234338983055 },
//     { "latitude": -23.409429894915252, "longitude": -46.85073687118644 },
//     { "latitude": -23.40948157118644, "longitude": -46.850239403389836 },
//     { "latitude": -23.409533247457627, "longitude": -46.84974193559322 },
//     { "latitude": -23.40958492372881, "longitude": -46.849244467796616 },
//     { "latitude": -23.4096366, "longitude": -46.848747 }
// ]

const routePoints = [
    { latitude: -23.403983, longitude: -46.863861 },
    { latitude: -23.404013, longitude: -46.863539 },
    { latitude: -23.403896, longitude: -46.863487 },
    { latitude: -23.403539, longitude: -46.862791 },
    { latitude: -23.403603, longitude: -46.863483 },
    { latitude: -23.403281, longitude: -46.863464 },
    { latitude: -23.402980, longitude: -46.863480 },
    { latitude: -23.402766, longitude: -46.863480 },
    { latitude: -23.402597, longitude: -46.863454 },
    { latitude: -23.402416, longitude: -46.863477 },
    { latitude: -23.402130, longitude: -46.863454 },
    { latitude: -23.401946, longitude: -46.863477 },
    { latitude: -23.401792, longitude: -46.863444 },
    { latitude: -23.401506, longitude: -46.863464 },
    { latitude: -23.401262, longitude: -46.863487 },
    { latitude: -23.401051, longitude: -46.865614 },
    { latitude: -23.400494, longitude: -46.865660 },
    { latitude: -23.399575, longitude: -46.864708 },
    { latitude: -23.399156, longitude: -46.864580 },
    { latitude: -23.398764, longitude: -46.864563 },
    { latitude: -23.398644, longitude: -46.864685 },
];

ws.on('connect', function () {
    console.log('Conectado ao servidor Socket.IO');

    let index = 0;

    const interval = setInterval(() => {
        if (index >= routePoints.length) {
            clearInterval(interval);
            console.log('Percurso concluído.');
            ws.close();
            return;
        }

        const isLastLocation = index === routePoints.length - 1;
        const locationUpdate = {
            location: routePoints[index],
            routeId: 22,
            userId: "3fdf2f6c-495a-4a0b-96ad-e30fa78a3c1d",
            status: isLastLocation ? "FINISHED" : "STARTED",
        };

        ws.emit('locationUpdate', locationUpdate);
        console.log('Enviado:', locationUpdate);

        index++;
    }, 1000);
});

ws.on('disconnect', function () {
    console.log('Conexão fechada');
});

ws.on('connect_error', function (err) {
    console.error('Erro de conexão:', err);
});
