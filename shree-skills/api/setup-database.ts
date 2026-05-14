#!/usr/bin/env node

/**
 * Database Setup Script
 * This script helps set up the Shree Skills database from scratch
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as readline from 'readline';

const execAsync = promisify(exec);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
};

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m'
};

const log = {
    info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    step: (msg: string) => console.log(`\n${colors.bright}${msg}${colors.reset}`)
};

async function runCommand(command: string, description: string): Promise<void> {
    try {
        log.info(`${description}...`);
        const { stdout, stderr } = await execAsync(command);
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        log.success(`${description} completed`);
    } catch (error: any) {
        log.error(`${description} failed: ${error.message}`);
        throw error;
    }
}

async function main() {
    console.log(`
${colors.bright}╔════════════════════════════════════════════════╗
║  Shree Skills - Database Setup Wizard         ║
╚════════════════════════════════════════════════╝${colors.reset}
`);

    try {
        // Step 1: Check .env file
        log.step('Step 1: Checking environment configuration');
        try {
            require('dotenv').config();
            if (!process.env.DATABASE_URL) {
                log.error('.env file not found or DATABASE_URL not set!');
                log.info('Please create api/.env file with your Supabase DATABASE_URL');
                log.info('Example: DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres?schema=public&sslmode=require"');
                process.exit(1);
            }
            log.success('Environment configuration found');
        } catch (error) {
            log.warning('dotenv not installed, assuming environment variables are set');
        }

        // Step 2: Generate Prisma Client
        log.step('Step 2: Generating Prisma Client');
        await runCommand('npx prisma generate', 'Generating Prisma Client');

        // Step 3: Push schema to database
        log.step('Step 3: Creating database tables');
        const pushAnswer = await question(
            `\n${colors.yellow}This will create/update tables in your database. Continue? (y/n): ${colors.reset}`
        );

        if (pushAnswer.toLowerCase() !== 'y') {
            log.warning('Database setup cancelled');
            process.exit(0);
        }

        await runCommand('npx prisma db push', 'Pushing schema to database');

        // Step 4: Seed database
        log.step('Step 4: Seeding database with sample data');
        const seedAnswer = await question(
            `\n${colors.yellow}Seed database with sample courses, blogs, and roadmaps? (y/n): ${colors.reset}`
        );

        if (seedAnswer.toLowerCase() === 'y') {
            await runCommand('npm run seed:enhanced', 'Seeding database');
        } else {
            log.info('Skipping database seeding');
        }

        // Success
        console.log(`
${colors.green}${colors.bright}╔════════════════════════════════════════════════╗
║  ✓ Database Setup Complete!                    ║
╚════════════════════════════════════════════════╝${colors.reset}

${colors.bright}Next Steps:${colors.reset}
1. Start the backend: ${colors.blue}npm run dev${colors.reset}
2. Test the API: ${colors.blue}http://localhost:4000/api/health${colors.reset}
3. Start the frontend: ${colors.blue}cd ../web && npm run dev${colors.reset}

${colors.bright}Test Credentials:${colors.reset}
Email: admin@shreeskills.com
Password: password123

${colors.bright}API Endpoints:${colors.reset}
- Courses: ${colors.blue}http://localhost:4000/api/courses${colors.reset}
- Blogs: ${colors.blue}http://localhost:4000/api/blogs${colors.reset}
- Roadmaps: ${colors.blue}http://localhost:4000/api/roadmaps${colors.reset}
`);

    } catch (error: any) {
        log.error(`Setup failed: ${error.message}`);
        console.log(`\n${colors.red}Setup encountered an error. Please check the error message above.${colors.reset}`);
        process.exit(1);
    } finally {
        rl.close();
    }
}

main();
