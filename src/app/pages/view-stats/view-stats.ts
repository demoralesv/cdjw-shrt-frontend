// la pantalla de estadísticas de cada URL
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlService, UrlDoc, UrlStats } from '../../services/url';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-view-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-stats.html',
  styleUrls: ['./view-stats.css'],
})
export class ViewStats {
  urls: UrlDoc[] = [];
  loadingList = false;

  selected: UrlDoc | null = null;
  stats: UrlStats | null = null;

  loadingStats = false;
  error = '';
  chart: any;

  constructor(private urlService: UrlService, private cdr: ChangeDetectorRef) {}
  // cargar la lista de URLs
  ngOnInit() {
    // el get
    this.loadList();
  }

  loadList() {
    this.loadingList = true;
    this.error = '';
    this.cdr.detectChanges();

    this.urlService.list().subscribe({
      next: (items) => {
        // orden alfabético de las URLs
        this.urls = (items || []).slice().sort((a, b) =>
          (a.originalUrl || '').localeCompare(b.originalUrl || '')
        );
        this.loadingList = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar la lista de URLs.';
        this.loadingList = false;
        this.cdr.detectChanges();
      },
    });
  }
  // se quiere ver la info de una URL
  view(u: UrlDoc) {
    this.selected = u;
    this.stats = null;
    this.error = '';
    this.loadingStats = true;
    this.cdr.detectChanges();

    this.urlService.stats(u.code).subscribe({
      next: (s) => {
        this.stats = s;
        this.loadingStats = false;
	
	setTimeout(() => {
	   this.createChart(s.dailyFrequency);
	});

        this.cdr.detectChanges();
      },
      error: (e: any) => {
        this.error = e?.error?.error || 'No se pudieron cargar las estadísticas.';
        this.loadingStats = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Helpers en la interfaz
  formatDate(iso: string) {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  }

  maxDailyCount(): number {
    if (!this.stats?.dailyFrequency?.length) return 1;
    return Math.max(...this.stats.dailyFrequency.map(x => x.count), 1);
  }

  // banderas para los paises
  flagEmoji(countryName: string): string {
    const map: Record<string, string> = {
	'AF': '🇦🇫',
	'AL': '🇦🇱',
	'DZ': '🇩🇿',
	'AS': '🇦🇸',
	'AD': '🇦🇩',
	'AO': '🇦🇴',
	'AI': '🇦🇮',
	'AQ': '🇦🇶',
	'AG': '🇦🇬',
	'AR': '🇦🇷',
	'AM': '🇦🇲',
	'AW': '🇦🇼',
	'AU': '🇦🇺',
	'AT': '🇦🇹',
	'AZ': '🇦🇿',
	'BS': '🇧🇸',
	'BH': '🇧🇭',
	'BD': '🇧🇩',
	'BB': '🇧🇧',
	'BY': '🇧🇾',
	'BE': '🇧🇪',
	'BZ': '🇧🇿',
	'BJ': '🇧🇯',
	'BM': '🇧🇲',
	'BT': '🇧🇹',
	'BO': '🇧🇴',
	'BA': '🇧🇦',
	'BW': '🇧🇼',
	'BR': '🇧🇷',
	'BN': '🇧🇳',
	'BG': '🇧🇬',
	'BF': '🇧🇫',
	'BI': '🇧🇮',
	'KH': '🇰🇭',
	'CM': '🇨🇲',
	'CA': '🇨🇦',
	'CV': '🇨🇻',
	'KY': '🇰🇾',
	'CF': '🇨🇫',
	'TD': '🇹🇩',
	'CL': '🇨🇱',
	'CN': '🇨🇳',
	'CO': '🇨🇴',
	'KM': '🇰🇲',
	'CG': '🇨🇬',
	'CD': '🇨🇩',
	'CR': '🇨🇷',
	'CI': '🇨🇮',
	'HR': '🇭🇷',
	'CU': '🇨🇺',
	'CY': '🇨🇾',
	'CZ': '🇨🇿',
	'DK': '🇩🇰',
	'DJ': '🇩🇯',
	'DM': '🇩🇲',
	'DO': '🇩🇴',
	'EC': '🇪🇨',
	'EG': '🇪🇬',
	'SV': '🇸🇻',
	'GQ': '🇬🇶',
	'ER': '🇪🇷',
	'EE': '🇪🇪',
	'ET': '🇪🇹',
	'FJ': '🇫🇯',
	'FI': '🇫🇮',
	'FR': '🇫🇷',
	'GA': '🇬🇦',
	'GM': '🇬🇲',
	'GE': '🇬🇪',
	'DE': '🇩🇪',
	'GH': '🇬🇭',
	'GI': '🇬🇮',
	'GR': '🇬🇷',
	'GL': '🇬🇱',
	'GD': '🇬🇩',
	'GU': '🇬🇺',
	'GT': '🇬🇹',
	'GN': '🇬🇳',
	'GW': '🇬🇼',
	'GY': '🇬🇾',
	'HT': '🇭🇹',
	'HN': '🇭🇳',
	'HK': '🇭🇰',
	'HU': '🇭🇺',
	'IS': '🇮🇸',
	'IN': '🇮🇳',
	'ID': '🇮🇩',
	'IR': '🇮🇷',
	'IQ': '🇮🇶',
	'IE': '🇮🇪',
	'IL': '🇮🇱',
	'IT': '🇮🇹',
	'JM': '🇯🇲',
	'JP': '🇯🇵',
	'JO': '🇯🇴',
	'KZ': '🇰🇿',
	'KE': '🇰🇪',
	'KI': '🇰🇮',
	'KP': '🇰🇵',
	'KR': '🇰🇷',
	'KW': '🇰🇼',
	'KG': '🇰🇬',
	'LA': '🇱🇦',
	'LV': '🇱🇻',
	'LB': '🇱🇧',
	'LS': '🇱🇸',
	'LR': '🇱🇷',
	'LY': '🇱🇾',
	'LI': '🇱🇮',
	'LT': '🇱🇹',
	'LU': '🇱🇺',
	'MO': '🇲🇴',
	'MK': '🇲🇰',
	'MG': '🇲🇬',
	'MW': '🇲🇼',
	'MY': '🇲🇾',
	'MV': '🇲🇻',
	'ML': '🇲🇱',
	'MT': '🇲🇹',
	'MH': '🇲🇭',
	'MR': '🇲🇷',
	'MU': '🇲🇺',
	'MX': '🇲🇽',
	'FM': '🇫🇲',
	'MD': '🇲🇩',
	'MC': '🇲🇨',
	'MN': '🇲🇳',
	'ME': '🇲🇪',
	'MA': '🇲🇦',
	'MZ': '🇲🇿',
	'MM': '🇲🇲',
	'NA': '🇳🇦',
	'NR': '🇳🇷',
	'NP': '🇳🇵',
	'NL': '🇳🇱',
	'NZ': '🇳🇿',
	'NI': '🇳🇮',
	'NE': '🇳🇪',
	'NG': '🇳🇬',
	'NO': '🇳🇴',
	'OM': '🇴🇲',
	'PK': '🇵🇰',
	'PW': '🇵🇼',
	'PA': '🇵🇦',
	'PG': '🇵🇬',
	'PY': '🇵🇾',
	'PE': '🇵🇪',
	'PH': '🇵🇭',
	'PL': '🇵🇱',
	'PT': '🇵🇹',
	'QA': '🇶🇦',
	'RO': '🇷🇴',
	'RU': '🇷🇺',
	'RW': '🇷🇼',
	'KN': '🇰🇳',
	'LC': '🇱🇨',
	'VC': '🇻🇨',
	'WS': '🇼🇸',
	'SM': '🇸🇲',
	'ST': '🇸🇹',
	'SA': '🇸🇦',
	'SN': '🇸🇳',
	'RS': '🇷🇸',
	'SC': '🇸🇨',
	'SL': '🇸🇱',
	'SG': '🇸🇬',
	'SK': '🇸🇰',
	'SI': '🇸🇮',
	'SB': '🇸🇧',
	'SO': '🇸🇴',
	'ZA': '🇿🇦',
	'ES': '🇪🇸',
	'LK': '🇱🇰',
	'SD': '🇸🇩',
	'SR': '🇸🇷',
	'SE': '🇸🇪',
	'CH': '🇨🇭',
	'SY': '🇸🇾',
	'TW': '🇹🇼',
	'TJ': '🇹🇯',
	'TZ': '🇹🇿',
	'TH': '🇹🇭',
	'TL': '🇹🇱',
	'TG': '🇹🇬',
	'TO': '🇹🇴',
	'TT': '🇹🇹',
	'TN': '🇹🇳',
	'TR': '🇹🇷',
	'TM': '🇹🇲',
	'UG': '🇺🇬',
	'UA': '🇺🇦',
	'AE': '🇦🇪',
	'GB': '🇬🇧',
	'US': '🇺🇸',
	'UY': '🇺🇾',
	'UZ': '🇺🇿',
	'VU': '🇻🇺',
	'VA': '🇻🇦',
	'VE': '🇻🇪',
	'VN': '🇻🇳',
	'YE': '🇾🇪',
	'ZM': '🇿🇲',
	'ZW': '🇿🇼',
    };
    return map[countryName] || '🏳️';
  }
  // crear el gráfico
  createChart(data: any[]) {

    const labels = data.map(d => d.date);
    const counts = data.map(d => d.count);
    const ctx = document.getElementById('dailyChart') as HTMLCanvasElement;

    if (!ctx) return;
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Accesos por día',
          data: counts,
          backgroundColor: '#facc15',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
