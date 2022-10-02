function previous() {
    document.getElementById("left").style.color = "transparent";
    document.getElementById("previous").style.cursor = "unset";
    document.getElementById("right").style.color = "black";
    document.getElementById("next").style.cursor = "pointer";
    document.getElementById("qline1").style.display = "block";
    document.getElementById("qline2").style.display = "none";
    document.getElementById("endBtn").style.display = "none";
    document.getElementById("pgNum").innerHTML = "페이지 1";
    window.scrollTo(0, 0);
}

function next() {
    document.getElementById("left").style.color = "black";
    document.getElementById("previous").style.cursor = "pointer";
    document.getElementById("right").style.color = "transparent";
    document.getElementById("next").style.cursor = "unset";
    document.getElementById("qline1").style.display = "none";
    document.getElementById("qline2").style.display = "block";
    document.getElementById("endBtn").style.display = "flex";
    document.getElementById("pgNum").innerHTML = "페이지 2";
    window.scrollTo(0, 0);
}

function toResult() {
    var tof = false;
    var arrRadio = [];
    for(var i = 1; i <= 12; i++) {
        tof = false;
        arrRadio = document.getElementsByName("radio" + i);
        for(var si = 0; si < 4; si++) {
            if(arrRadio[si].checked) {
                tof = true;
                break;
            }
        }
        if(tof == false) {
            alert(`모든 문항에 응답해주세요. (${i}번)`);
            return;
        }
    }
    
    var character = ["dA", "dS", "mA", "bA", "kE", "mO", "uN", "eT"];
    var test = ["1 4", "6 8", "5 -7", "2 -4", "3 -1", "2 7", "6 -8", "4 -5", "1 -3", "7 -8", "2 5", "3 -6"];
    var importantQ = [4, 3, 8, 7, 10, 11, 5, 9];
    var score = {"dA":0, "dS":0, "mA":0, "bA":0, "kE":0, "mO":0, "uN":0, "eT":0};
    var arrRadio = [];
    var splitArr = [];
    var splitArrZ = 0;
    var splitArrO = 0;
    var nSplitArrO = 0;
    for(var i = 0; i < 12; i++) {
        arrRadio = document.getElementsByName("radio" + (i + 1));
        splitArr = test[i].split(' ');
        for(var si = 0; si < 4; si++) {
            if(arrRadio[si].checked) {
                break;
            }
        }
        splitArrZ = Number(splitArr[0]) - 1;
        splitArrO = Number(splitArr[1]) - 1;
        if(splitArrO < 0) {
            nSplitArrO = Math.abs(splitArrO + 2);
        } else {
            nSplitArrO = splitArrO;
        }
        if(si == 0) {
            score[character[splitArrZ]] += 3;
            if(splitArrO > 0) {
                score[character[nSplitArrO]] += 3;
            }
        }
        else if(si == 1) {
            score[character[splitArrZ]] += 2;
            if(splitArrO > 0) {
                score[character[nSplitArrO]] += 2;
            } else {
                score[character[nSplitArrO]] += 1;
            }
        }
        else if(si == 2) {
            score[character[splitArrZ]] += 1;
            if(splitArrO > 0) {
                score[character[nSplitArrO]] += 1;
            } else {
                score[character[nSplitArrO]] += 2;
            }
        }
        else {
            if(splitArrO < 0) {
                score[character[nSplitArrO]] += 3;
            }
        }
        for(var iq = 0; iq < 8; iq++) {
            if(importantQ[iq] == i) {
                if(iq == splitArrZ) {
                    if(si == 0) {
                        score[character[splitArrZ]] += 2;
                    }
                    else if(si == 1) {
                        score[character[splitArrZ]] += 1;
                    }
                    else if(si == 3) {
                        score[character[splitArrZ]] -= 1;
                    }
                }
                else if(iq == nSplitArrO) {
                    if(splitArrO > 0) {
                        if(si == 0) {
                            score[character[nSplitArrO]] += 2;
                        }
                        else if(si == 1) {
                            score[character[nSplitArrO]] += 1;
                        }
                        else if(si == 3) {
                            score[character[nSplitArrO]] -= 1;
                        }
                    }
                    else if(splitArrO < 0) {
                        if(si == 3) {
                            score[character[nSplitArrO]] += 2;
                        }
                        else if(si == 2) {
                            score[character[nSplitArrO]] += 1;
                        }
                        else if(si == 0) {
                            score[character[nSplitArrO]] -= 1;
                        }
                    } 
                }
            }
        }
    }
    sessionStorage.setItem('overTwo', "0");
    sessionStorage.setItem('result', JSON.stringify(score));
    location.href = "result.html";
}

function result() {
    var character = ["dA", "dS", "mA", "bA", "kE", "mO", "uN", "eT"];
    var name = ["다오", "디지니", "마리드", "배찌", "케피", "모스", "우니", "에띠"];
    var score = JSON.parse(sessionStorage.getItem('result'));
    var color = ['blue', 'yellow', 'deeppink', 'red', 'purple', 'orange', 'dodgerblue', 'green'];
    var description = ['다오는 격정과 정의감이 넘치는 열혈 라이더입니다. 긍정적인 마인드를 가지고 있고, 정의로운 성격으로 인해 레이싱 중 다른 라이더를 공격하거나 비정상적인 방법으로 승리를 쟁취하는 것을 꺼려합니다.', '디지니는 상냥하고 수줍은 미소녀 라이더입니다. 수줍어하는 성격으로 차를 무서워했으나 다오가 카트운전 면허를 딴 이후 자신도 노력하여 실력을 키웠습니다. 이제 카트를 운전하면 과감한 모습을 보여줍니다.', '마리드는 건방지지만 낭만적인 라이더입니다. 운전을 귀찮아했었음에도 불구하고 자신이 짝사랑하는 다오의 마음을 디지니에게서 뺏기 위해 멋진 카트 드라이빙을 항상 연습합니다. 상당히 결과를 중요시합니다.', '배찌는 성격이 단순하고 낙천적인 라이더입니다. 나태하여 모든 일들이 귀찮고 방에서 뒹구는 것을 좋아합니다. 무신경한 성격으로 스피드를 두려워하지 않는 타고난 라이더입니다.', '케피는 소심하지만 각고의 노력을 하는 부지런한 라이더입니다. 속도를 무서워해서 높은 속력에서의 운전을 힘들어하지만 그의 꾸준한 드라이빙 연습으로 단점을 커버합니다.', '모스는 붐힐 마을에서 가장가는 기술자이며 다오의 레이싱 생활의 가장 중요한 멘토입니다. 레이스에서 항상 1위를 차지하는 것보다는 꾸준히 순위권 안에 들어오는 것이 진정한 실력이라고 생각합니다.', '우니는 어린나이지만 운전 기술이 뛰어난 천재 라이더입니다. 손발이 짧아 모스에게 특별히 부탁한 개조카트를 빌려서 레이스에 참가합니다. 굉장히 귀엽고 순진한 라이더이기도 합니다.', '에띠는 카트 운전보다는 차량 설계를 좋아하는 기술자입니다. 자신이 설계한 차량을 직접 테스트 해 보기 위해 운전을 배운 타고난 기술자이지요. 매우 똑똑하기 때문에 카트에 대한 이해가 깊습니다.'];
    var reVar = 0;
    var reIdx = 0;
    var charI = "";
    for(var i = 0; i < 8; i++) {
        if(reVar < score[character[i]]) {
            charI = character[i];
            reVar = score[charI];
            reIdx = i;
        }
    }
    document.getElementById('reImg').src = "src/" + charI + ".png";
    document.getElementById('reImg').alt = name[reIdx];
    document.getElementById('reName').innerHTML = name[reIdx];
    document.getElementById('reName').style.color = color[reIdx];
    document.getElementById('reScore').innerHTML = "점수 : " + reVar + "/11";
    document.getElementById('dscrpt').innerHTML = description[reIdx];
    document.getElementById('dscrpt').style.color = color[reIdx];
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() { drawChart(name, Object.values(score)) });
}

function drawChart(name, score) {
    var arr = [];
    arr.push(['Character', 'Score']);
    for(var i = 0; i < 8; i++) {
        if(score[i] >= 0) {
            arr.push([name[i], score[i]]);
        } else {
            arr.push([name[i], 0]);
        }
    }
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
        title: '점수', 
        width: 550,
        height: 400,
        colors: ['#0000ff', '#ffff00', '#ff1493', '#ff0000', '#800080', '#ffa500', '#1e90ff', '#008000'],
        backgroundColor: 'transparent'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}