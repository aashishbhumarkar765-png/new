#!/usr/bin/env node

/**
 * Comprehensive System Verification Script
 * Tests all components of the Shree Skills platform
 */

const http = require('http');
const https = require('https');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

const log = {
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    step: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`)
};

async function checkEndpoint(url, description) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;

        const req = client.get(url, { timeout: 5000 }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    log.success(`${description} - Status: ${res.statusCode}`);
                    try {
                        const json = JSON.parse(data);
                        if (Array.isArray(json)) {
                            log.info(`  → Found ${json.length} items`);
                        }
                    } catch (e) {
                        // Not JSON, that's okay
                    }
                    resolve({ success: true, status: res.statusCode });
                } else {
                    log.warning(`${description} - Status: ${res.statusCode}`);
                    resolve({ success: false, status: res.statusCode });
                }
            });
        });

        req.on('error', (err) => {
            log.error(`${description} - ${err.message}`);
            resolve({ success: false, error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            log.error(`${description} - Request timeout`);
            resolve({ success: false, error: 'timeout' });
        });
    });
}

async function main() {
    console.log(`
${colors.bright}${colors.cyan}╔══════════════════════════════════════════════════╗
║  Shree Skills - System Verification              ║
╚══════════════════════════════════════════════════╝${colors.reset}
  `);

    const results = {
        backend: {},
        frontend: {},
        total: 0,
        passed: 0,
        failed: 0
    };

    // Backend Tests
    log.step('🔧 Backend API Tests');

    const backendTests = [
        { url: 'http://localhost:4000/api/health', name: 'Health Check' },
        { url: 'http://localhost:4000/api/courses', name: 'Courses Endpoint' },
        { url: 'http://localhost:4000/api/blogs', name: 'Blogs Endpoint' },
        { url: 'http://localhost:4000/api/roadmaps', name: 'Roadmaps Endpoint' },
    ];

    for (const test of backendTests) {
        results.total++;
        const result = await checkEndpoint(test.url, test.name);
        results.backend[test.name] = result;
        if (result.success) results.passed++;
        else results.failed++;
    }

    // Frontend Tests
    log.step('🌐 Frontend Tests');

    const frontendTests = [
        { url: 'http://localhost:3000', name: 'Home Page' },
        { url: 'http://localhost:3000/courses', name: 'Courses Page' },
        { url: 'http://localhost:3000/blogs', name: 'Blogs Page' },
        { url: 'http://localhost:3000/roadmaps', name: 'Roadmaps Page' },
    ];

    for (const test of frontendTests) {
        results.total++;
        const result = await checkEndpoint(test.url, test.name);
        results.frontend[test.name] = result;
        if (result.success) results.passed++;
        else results.failed++;
    }

    // Summary
    console.log(`
${colors.bright}╔══════════════════════════════════════════════════╗
║  Verification Summary                            ║
╚══════════════════════════════════════════════════╝${colors.reset}

${colors.bright}Results:${colors.reset}
  Total Tests: ${results.total}
  ${colors.green}Passed: ${results.passed}${colors.reset}
  ${colors.red}Failed: ${results.failed}${colors.reset}

${colors.bright}Status:${colors.reset} ${results.failed === 0 ?
            `${colors.green}${colors.bright}✓ All systems operational!${colors.reset}` :
            `${colors.yellow}${colors.bright}⚠ Some services need attention${colors.reset}`}
  `);

    if (results.failed > 0) {
        console.log(`${colors.bright}Troubleshooting:${colors.reset}
1. Ensure backend is running: ${colors.cyan}cd api && npm run dev${colors.reset}
2. Ensure frontend is running: ${colors.cyan}cd web && npm run dev${colors.reset}
3. Check database connection in ${colors.cyan}api/.env${colors.reset}
4. Review error logs at ${colors.cyan}api/logs/error.log${colors.reset}
    `);
    } else {
        console.log(`${colors.bright}Everything looks good! 🎉${colors.reset}

${colors.bright}Access your platform:${colors.reset}
  Frontend: ${colors.blue}http://localhost:3000${colors.reset}
  Backend:  ${colors.blue}http://localhost:4000${colors.reset}

${colors.bright}API Documentation:${colors.reset}
  Health:   ${colors.blue}http://localhost:4000/api/health${colors.reset}
  Courses:  ${colors.blue}http://localhost:4000/api/courses${colors.reset}
  Blogs:    ${colors.blue}http://localhost:4000/api/blogs${colors.reset}
  Roadmaps: ${colors.blue}http://localhost:4000/api/roadmaps${colors.reset}
    `);
    }

    process.exit(results.failed > 0 ? 1 : 0);
}

main();
