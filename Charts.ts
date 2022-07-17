declare class Chart {
    constructor(
        context: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
        options: any
    );
}

var GlobalScope: any = {};

type fmapper = (x:number)=>number;
type fmapstr = (x:number)=>string;

type TChartsOptions = {
    xlabelcallback: fmapper,
    ylabelcallback: fmapper,
    legend: string,
    title: string,
    subtitle: string,
    xlabel: string,
    ylabel: string,
    proportion: string,
    tooltip: Function
};


abstract class Charts {

    static buildFunction(code: string, variable: string, env?: string): fmapper {
        let result: fmapper = eval(
            "(" +
            variable +
            ") => { " + (env?(env+";"):"") + "return (" +
            code +
            "); }"
        );
        return result;
    }

    static buildDatasets(n: number) {
        let result = new Array(n);
        for (let i=0;i<n;i++) {
            result[i] = {
                label: undefined as unknown as string,
                backgroundColor: 'rgb(132, 99, 255)',
                borderColor: 'rgb(132, 99, 255)',
                pointRadius: 3,
                data: [] as Array<any>,
            };
        }
        return result;
    }

    static buildData(ndataset: number) {
        return {
            labels: [] as Array<any>,
            datasets: Charts.buildDatasets(ndataset)
        };
    }

    static buildOption(): {[k: string]: any} {
        return {
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: undefined as unknown as string
                },
                subtitle: {
                    display: false,
                    text: undefined as unknown as string
                }
            },
            scales: {
                x: {
                    title: {
                        display: false,
                        text: undefined as unknown as string
                    },
                    ticks: {}
                },
                y: {
                    title: {
                        display: false,
                        text: undefined as unknown as string
                    },
                    ticks: {}
                }
            },
            animation: {
                duration: 0 // general animation time
            },
            hover: {
                animationDuration: 0 // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0 // animation duration after a resize
        }        
    }

    static functionXY(
            container: string | HTMLElement,
            codeX: string,
            variable: string,
            start: string | number,
            step: string | number,
            end: string | number,
            options: TChartsOptions
        ) {
        if (typeof container == 'string') {
            container = document.getElementById(container) as HTMLElement;
        }
        let CanvasChart = document.createElement('canvas');
        container.append(CanvasChart);

        const data = Charts.buildData(1);
        const opt = Charts.buildOption();

        start = eval(start as string) as number;
        step = eval(step as string) as number;
        end = eval(end as string) as number;

        let xlabelcallback : fmapper | undefined;
        if (options!==undefined) {
            if (options.xlabelcallback!==undefined) {
                xlabelcallback = options.xlabelcallback;
            }
            if (options.ylabelcallback!==undefined) {
                opt.scales.y.ticks.callback = options.ylabelcallback
            }
            if (options.legend!==undefined) {
                data.datasets[0].label = options.legend;
                opt.plugins.legend.display = true;
            }
            if (options.title!==undefined) {
                opt.plugins.title.text = options.title;
                opt.plugins.title.display = true;
            }
            if (options.subtitle!==undefined) {
                opt.plugins.subtitle.text = options.subtitle;
                opt.plugins.subtitle.display = true;
            }
            if (options.xlabel!==undefined) {
                opt.scales.x.title.text = options.xlabel;
                opt.scales.x.title.display = true;
            }
            if (options.ylabel!==undefined) {
                opt.scales.y.title.text = options.ylabel;
                opt.scales.y.title.display = true;
            }
            if (options.tooltip!==undefined) {
                opt.plugins.tooltip = options.tooltip;
            }
        }

        let fxy = this.buildFunction(codeX,variable);
        let n = Math.trunc((end - start)/step) + 1;
        for (let i=0;i<n;i++) {
            let x_data = start + i * step;
            let y_data = fxy(x_data);
            data.labels.push((xlabelcallback!==undefined)?(xlabelcallback(x_data)):(x_data));
            data.datasets[0].data.push(y_data);
        }

        const config = {
            type: 'line',
            data: data,
            options: opt
        };

        const theChart = new Chart(
            CanvasChart,
            config
        );

    }

    static parametricXY(
        container: string | HTMLElement,
        codeX: string,
        codeY: string,
        parameter: string,
        start: string | number,
        step: string | number,
        end: string | number,
        options: TChartsOptions,
        env: string
    ) {
        if (typeof container == 'string') {
            container = document.getElementById(container) as HTMLElement;
        }
        let CanvasChart = document.createElement('canvas');
        CanvasChart.setAttribute('style','width:600px; height:600px');
        container.append(CanvasChart);

        const data = Charts.buildData(1);
        const opt = Charts.buildOption();
        
        start = eval(env + ";" + start as string) as number;
        step = eval(env + ";" + step as string) as number;
        end = eval(env + ";" + end as string) as number;

        if (options!==undefined) {
            if (options.xlabelcallback!==undefined) {
                opt.scales.x.ticks.callback = options.xlabelcallback
            }
            if (options.ylabelcallback!==undefined) {
                opt.scales.y.ticks.callback = options.ylabelcallback
            }
            if (options.legend!==undefined) {
                data.datasets[0].label = options.legend;
                opt.plugins.legend.display = true;
            }
            if (options.title!==undefined) {
                opt.plugins.title.text = options.title;
                opt.plugins.title.display = true;
            }
            if (options.subtitle!==undefined) {
                opt.plugins.subtitle.text = options.subtitle;
                opt.plugins.subtitle.display = true;
            }
            if (options.xlabel!==undefined) {
                opt.scales.x.title.text = options.xlabel;
                opt.scales.x.title.display = true;
            }
            if (options.ylabel!==undefined) {
                opt.scales.y.title.text = options.ylabel;
                opt.scales.y.title.display = true;
            }
            if (options.tooltip!==undefined) {
                opt.plugins.tooltip = options.tooltip;
            }
        }

        opt.scales.x.type = 'linear';
        opt.scales.x.position = 'bottom';

        let fx = Charts.buildFunction(codeX,parameter,env);
        let fy = Charts.buildFunction(codeY,parameter,env);
        GlobalScope.fx = fx;
        GlobalScope.fy = fy;


        let n = Math.trunc((end - start)/step) + 1;
        for (let i=0;i<n;i++) {
            let p_data = start + i * step;
            let x_data = GlobalScope.fx(p_data);
            let y_data = GlobalScope.fy(p_data);
            data.datasets[0].data.push({x: x_data, y: y_data});
        }

        const config = {
            type: 'scatter',
            data: data,
            options: opt
        };

        const theChart = new Chart(
            CanvasChart,
            config
        );

        return theChart;

    }

    static sunChart(
        container: string | HTMLElement,
        year: number,
        lat: number,
        lng: number,
        tz: number,
        options: TChartsOptions,
    ) {
        if (typeof container == 'string') {
            container = document.getElementById(container) as HTMLElement;
        }
        let CanvasChart = document.createElement('canvas');
        CanvasChart.setAttribute('style','width:600px; height:600px');
        container.append(CanvasChart);

        const data = Charts.buildData(13);
        const opt = Charts.buildOption();
        
        let start = 0;
        let step = 1;
        let end = Computus.yeardays(year)-1;

        if (options!==undefined) {
            if (options.legend!==undefined) {
                data.datasets[0].label = options.legend;
                opt.plugins.legend.display = true;
            }
            if (options.title!==undefined) {
                opt.plugins.title.text = options.title;
                opt.plugins.title.display = true;
            }
            if (options.subtitle!==undefined) {
                opt.plugins.subtitle.text = options.subtitle;
                opt.plugins.subtitle.display = true;
            }
            if (options.xlabel!==undefined) {
                opt.scales.x.title.text = options.xlabel;
                opt.scales.x.title.display = true;
            }
            if (options.ylabel!==undefined) {
                opt.scales.y.title.text = options.ylabel;
                opt.scales.y.title.display = true;
            }
        }
        opt.plugins.tooltip = {
            callbacks: {
                label: function(context: any) {
                    let d = context.dataIndex+1;
                    let date = Computus.doy2cal(year,d);
                    return (
                        Computus.monthTable['PT'][1][date[1] ] + " " + date[2] +
                        ", el: " + context.dataset.data[context.dataIndex].y +
                        ", " + (context.datasetIndex+7) + "h"
                    );
                }
            }
        }

        opt.scales.x.type = 'linear';
        opt.scales.x.position = 'bottom';
//        opt.scales.x.min = -3.25;
//        opt.scales.x.max = 3.25;
        opt.scales.x.ticks.callback = function(value: number, index: number, ticks: any) {
            return value;//Computus.az2cardinal(value*dtan(analemma[index].el),270);
        }

//        opt.scales.y.min = -1;
//        opt.scales.y.max = 2.2;
        opt.scales.y.ticks.callback = function(value: number) {
            return value;// + "º";
        }

        const analemma = Computus.sunAnalemma(year,12,lat,lng,tz);
        const sunchart = Computus.sunChart(year,lat,lng,tz);

        GlobalScope.fx = 
            function (d: number) { return dcos(90-sunchart[d][12].az)*dcos(sunchart[d][12].el)/dsin(sunchart[d][12].el); }
        GlobalScope.fy =
//            function (d: number) { return dsin(90-sunchart[d][12].az)*dcos(sunchart[d][12].el)/dsin(sunchart[d][12].el); };
            function (d: number) { return sunchart[d][12].el; };
        let n = Math.trunc((end - start)/step) + 1;
        for (let h=7; h<18; h++) {
            data.datasets[h-7].pointRadius = 0.6;
            for (let d=0;d<n;d++) {
                data.datasets[h-7].data.push({
                    x: dcos(90-sunchart[d][h].az)*dcos(sunchart[d][h].el)/dsin(sunchart[d][h].el),
//                    x: dcos(dmod(90-sunchart[d][h].az)),
                    y: dsin(90-sunchart[d][h].az)*dcos(sunchart[d][h].el)/dsin(sunchart[d][h].el),
//                    y: sunchart[d][h].el,

                });
            }    
        }
        
        const config = {
            type: 'scatter',
            data: data,
            options: opt
        };

        const theChart = new Chart(
            CanvasChart,
            config
        );

        return theChart;

    }

}

// How to Customize Tooltip Each Scatter Chart Data Point in Chart JS
// https://www.youtube.com/watch?v=80w6gWWDJM0

// How to Add More Information in the Tooltips in Chart JS
// https://www.youtube.com/watch?v=UxJ5d-HGhJA