$(function () {


  // =====================================
  // GRAFICO DA VISAO GERAL DE AUDITORIAS
  // =====================================
  
    let auditorias = [];

    try {
      const stored = localStorage.getItem("auditorias");
      auditorias = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Erro ao analisar os dados do localStorage:", e);
    }

    const concluidasMensal = new Array(12).fill(0);
    const pendentesMensal = new Array(12).fill(0);

    auditorias.forEach(auditoria => {
      const dataValida = auditoria.dataCriacao || auditoria.dataAgendamento;
      if (!dataValida) return;

      const data = new Date(dataValida);
      if (isNaN(data)) return;

      const mes = data.getMonth();

      if (auditoria.estado === "Concluída") {
        concluidasMensal[mes]++;
      } else {
        pendentesMensal[mes]++;
      }
    });

    const chartOptions = {
      series: [
        { name: "Auditorias Concluídas", data: concluidasMensal.slice(0, 8) },
        { name: "Auditorias Pendentes", data: pendentesMensal.slice(0, 8) },
      ],
      chart: {
        type: "bar",
        height: 345,
        offsetX: -15,
        toolbar: { show: true },
        foreColor: "#adb0bb",
        fontFamily: "inherit",
        sparkline: { enabled: false },
      },
      colors: ["#21560F", "#AACF45"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          borderRadius: 6,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "all",
        },
      },
      markers: { size: 0 },
      dataLabels: { enabled: false },
      legend: { show: false },
      grid: {
        borderColor: "rgba(0,0,0,0.1)",
        strokeDashArray: 3,
        xaxis: { lines: { show: false } },
      },
      xaxis: {
        type: "category",
        categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto"],
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },
      yaxis: {
        show: true,
        min: 0,
        max: 25,
        tickAmount: 4,
        labels: {
          style: { cssClass: "grey--text lighten-2--text fill-color" },
        },
      },
      stroke: {
        show: true,
        width: 3,
        lineCap: "butt",
        colors: ["transparent"],
      },
      tooltip: { theme: "light" },
      responsive: [
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: { borderRadius: 3 },
            },
          },
        },
      ],
    };

    const chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
    chart.render();
  



  // =====================================
  // GRAFICO DE OCORRENCIAS POR TIPO , ESTA DIRETAMENTE NO INDEX
  // =====================================

  
  
  



  // =====================================
  // GRAFICO DE OCORRENCIAS POR MES
  // =====================================
    // Pega as ocorrências do localStorage
  const ocorrencias = JSON.parse(localStorage.getItem("ocorrencias")) || [];

  // Array para contar ocorrências por mês (index 0 = janeiro, ..., 11 = dezembro)
  const ocorrenciasPorMes = new Array(12).fill(0);

  // Preenche o array contando ocorrências por mês, extraindo o mês da data
  ocorrencias.forEach((ocorrencia) => {
    if (ocorrencia.data) {
      // Espera-se formato "YYYY-MM-DD"
      const mes = new Date(ocorrencia.data).getMonth();
      ocorrenciasPorMes[mes]++;
    }
  });

  var earning = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Ocorrências",
        color: "#AACF45",
        data: ocorrenciasPorMes, // usa os dados dinâmicos
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: ["#f3feff"],
      type: "solid",
      opacity: 0.05,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };

  new ApexCharts(document.querySelector("#earning"), earning).render();
});