
       //참고 사이트들
       //https://gall.dcinside.com/mgallery/board/view/?id=vespa&no=599196&exception_mode=recommend&search_pos=-604002&s_type=search_all&s_keyword=%EA%B3%B5%EC%8B%9D&page=1
       //https://gall.dcinside.com/mgallery/board/view/?id=vespa&no=554178&exception_mode=recommend&search_pos=-556275&s_type=search_all&s_keyword=%EB%B0%A9%EA%B4%80&page=1
       //https://github.com/duckness/Mask-of-Goblin/blob/master/src/mixins/softcap.js
       //https://cafe.naver.com/kingsraid/736718 // 방어력 공식
       var changeStatClass = document.getElementsByClassName("inputStat");

        //캐릭터 스탯
        var att = document.getElementById("outAtt");
        var cri = document.getElementById("outCri");
        var cDmg = document.getElementById("outCDmg");
        var pDmg = document.getElementById("outPDmg");
        var aDmg = document.getElementById("outADmg");
        var bDmg = document.getElementById("outBDmg");
        var aSpd = document.getElementById("outASpd");

        //버프 스탯
        var attM = document.getElementById("outAttM");
        var attF = document.getElementById("outAttF");
        var attC = document.getElementById("outAttC");
        var criF = document.getElementById("outCriF");
        var cDmgF = document.getElementById("outCDmgF");
        var bDmgF = document.getElementById("outBDmgF");

        //적 스탯
        var increADmg = document.getElementById("outIncreADmg");
        var increPDmg = document.getElementById("outIncrePDmg");
        var increMDmg = document.getElementById("outIncreMDmg");
        var eDef = document.getElementById("outEDef");

        //스킬 정보
        var skillName = document.getElementById("outSkillName");
        var skillCoef = document.getElementById("outSkillCoef");
        var skillBDmg = document.getElementById("outSkillBDmg");
        var skillIncreDmg = document.getElementById("outSkillIncreDmg");
        var skillCDmg = document.getElementById("outSkillCDmg");
        
        //최종 스탯
        var totAtt = document.getElementById("totAtt");
        var totCri = document.getElementById("totCri");
        var totCDmg = document.getElementById("totCDmg");
        var totBDmg = document.getElementById("totBDmg");
        var totPDmg = document.getElementById("totPDmg");
        var totMDmg = document.getElementById("totMDmg");
        var totEDef = document.getElementById("totEDef");
        var totDmg = document.getElementById("totDmg");
        var totPSDmg = document.getElementById("totPSDmg");
        var totMSDmg = document.getElementById("totMSDmg");

        var stats = document.querySelectorAll('.outputStat');


        // var autoCal = document.querySelector('.lblStatName');
        // var buffAtt = document.querySelector('#buffAttR')

        //파일 이벤트리스너 등록
        document.getElementById("file-input").addEventListener("change", readFile, false); 
        var fileData;
        function readFile(e) {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e) {
                fileData= e.target.result;
                // 파일 데이터를 사용할 기능 구현
                
            };
            reader.readAsText(file);
        }


        comp.addEventListener("click",calcDmg);
        //입력칸들에게 이벤트리스너 등록
        for(var i = 0; i<changeStatClass.length; i++) {
            changeStatClass[i].addEventListener("blur",calcStat)
        }
        function calcStat(){
            //캐릭터 스탯
            att.innerText = document.getElementById("inAtt").value*1;
            cri.innerText = document.getElementById("inCri").value/10;
            cDmg.innerText = document.getElementById("inCDmg").value*1+200;
            pDmg.innerText = document.getElementById("inPDmg").value*1;
            aDmg.innerText = document.getElementById("inADmg").value*1+100;
            bDmg.innerText = document.getElementById("inBDmg").value*1+100;
            aSpd.innerText = document.getElementById("inASpd").value*1+100;

            //버프 스탯
            attM.innerText = document.getElementById("inAttM").value*1+100;
            attF.innerText = document.getElementById("inAttF").value*1;
            attC.innerText = document.getElementById("inAttC").value*1+100;
            criF.innerText = document.getElementById("inCriF").value/10;
            cDmgF.innerText = document.getElementById("inCDmgF").value*1;
            bDmgF.innerText = document.getElementById("inBDmgF").value*1;

            //적 스탯
            increADmg.innerText = document.getElementById("inIncreADmg").value*1+100;
            increPDmg.innerText = document.getElementById("inIncrePDmg").value*1+100;
            increMDmg.innerText = document.getElementById("inIncreMDmg").value*1+100;
            eDef.innerText = document.getElementById("inEDef").value*1;

            //스킬 정보
            skillName.innerText = document.getElementById("inSkillName").value;
            skillCoef.innerText = document.getElementById("inSkillCoef").value*1;
            skillBDmg.innerText = document.getElementById("inSkillBDmg").value*1;
            skillIncreDmg.innerText = document.getElementById("inSkillIncreDmg").value*1+100;
            skillCDmg.innerText = document.getElementById("inSkillCDmg").value*1;

            //최종 스탯
            totAtt.value = Math.round((att.innerText * (attM.innerText / 100) + attF.innerText*1) * attC.innerText/100);
            totCri.value = Math.min(Math.round(cri.innerText * 1 + criF.innerText * 1),100) ;
            totCDmg.value = Math.round(cDmg.innerText * 1 + cDmgF.innerText * 1);
            totADmg.value = Math.round(aDmg.innerText * 1 );
            totBDmg.value = Math.round(bDmg.innerText * 1 + bDmgF.innerText * 1);
            totPDmg.value = Math.round(increADmg.innerText * 1 + increPDmg.innerText * 1 - 100);
            totMDmg.value = Math.round(increADmg.innerText * 1 + increMDmg.innerText * 1 - 100);
            totEDef.value = Math.round(eDef.innerText * 1 );

            totDmg.value = comma(
                Math.round(
                    //(기본공격력)
                    ((totAtt.value))
                    //치명피해 계수 = 치명타확률*치피 + 노치명
                    * ((totCri.value/100) * ((totCDmg.value)/100) + (1 - (totCri.value/100))) 
                    //뎀증, 보스뎀증 계수
                    * (totADmg.value/100) * (totBDmg.value/100)
                    //적피증
                    * (totMDmg.value/100)
                )
            );

            totMSDmg.value = comma(
                Math.round(
                    //(기본공격력 * 계수 + 스킬 기본데미지)*스킬뎀증
                    (((totAtt.value * skillCoef.innerText) + skillBDmg.innerText*1) * skillIncreDmg.innerText/100)
                    //치명피해 계수 = 치명타확률*치피 + 노치명
                    * ((totCri.value/100) * ((totCDmg.value*1+skillCDmg.innerText*1)/100) + (1 - (totCri.value/100))) 
                    //뎀증, 보스뎀증 계수
                    * (totADmg.value/100) * (totBDmg.value/100)
                    //적피증
                    * (totMDmg.value/100)
                )
            );

            totPSDmg.value = comma(
                Math.round(
                    //(기본공격력 * 계수 + 스킬 기본데미지)*스킬뎀증
                    (((totAtt.value * skillCoef.innerText) + skillBDmg.innerText*1) * skillIncreDmg.innerText/100)
                    //치명피해 계수 = 치명타확률*치피 + 노치명
                    * ((totCri.value/100) * ((totCDmg.value*1+skillCDmg.innerText*1)/100) + (1 - (totCri.value/100))) 
                    //뎀증, 보스뎀증 계수
                    * (totADmg.value/100) * (totBDmg.value/100)
                    //적피증
                    * (totPDmg.value/100)
                )
            );
            
        }
        //콤마찍기
        function comma(str) {
            str = String(str);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        }
        function clickBtn() {
            totAtt.value = att.innerText;           
        }
        var totAtt
        function calcDmg(){
            totAtt = stats
        }

        function deadCode(){
            document.getElementById("outHp").innerText = document.getElementById("inHp").value;
            document.getElementById("outPDef").innerText = document.getElementById("inPDef").value;
            document.getElementById("outMDef").innerText = document.getElementById("inMDef").value;
        }