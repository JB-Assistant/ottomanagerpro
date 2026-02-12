# Oil Change Follow-Up CRM — Product Requirements Document

**Version:** 1.0
**Date:** February 2026
**Status:** Draft
**Classification:** Confidential

---

## Table of Contents

1. [Overview](#1-overview)
2. [Scope](#2-scope)
3. [Data Model](#3-data-model)
4. [Core Features](#4-core-features)
5. [User Interface](#5-user-interface)
6. [Technical Architecture](#6-technical-architecture)
7. [Implementation Phases](#7-implementation-phases)
8. [Acceptance Criteria](#8-acceptance-criteria)
9. [Risks & Mitigations](#9-risks--mitigations)
10. [Glossary](#10-glossary)

---

## 1. Overview

### 1.1 Purpose

This document defines the product requirements for an internal Oil Change Follow-Up CRM system. The system tracks customers who have received oil changes and triggers timely follow-ups when they are due for service again.

### 1.2 Problem Statement

Auto repair shops lose significant repeat business because there is no systematic way to track when customers are due for their next oil change and reach out to them proactively. Manual tracking via spreadsheets is error-prone, leads to missed follow-ups, and does not scale.

### 1.3 Target Users

- Shop owner / manager (primary)
- Service advisors / front desk staff

### 1.4 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Customer return rate | 30% increase in 6 months | Scheduled appointments from outreach |
| Follow-up coverage | 100% of eligible customers contacted | CRM follow-up completion rate |
| Outreach response rate | 25%+ positive response | Scheduled / total contacted |
| Time to follow-up | Within 3 days of due date | Average days between due date and first contact |

---

## 2. Scope

### 2.1 In Scope (MVP)

- Customer record management (name, phone, vehicle info)
- Service history tracking (oil change dates, mileage)
- Automated due date calculation (3-month / 5,000-mile intervals)
- Customer status flagging (Due Soon, Due Now, Overdue)
- Follow-up tracking (contact date, method, outcome)
- Dashboard with filterable customer list
- CSV import for initial customer data load

### 2.2 Out of Scope (Future Phases)

- Automated SMS/text sending (Phase 2)
- Appointment scheduling integration (Phase 2)
- Multi-location support (Phase 3)
- Customer self-service portal (Phase 3)
- Additional service types beyond oil changes (Phase 3)
- Reporting and analytics dashboard (Phase 2)

---

## 3. Data Model

### 3.1 Customer

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Auto | Primary key |
| firstName | String | Yes | |
| lastName | String | Yes | |
| phone | String | Yes | Primary contact, E.164 format |
| email | String | No | Optional secondary contact |
| notes | Text | No | Free-text notes about customer |
| status | Enum | Yes | active, inactive, declined |
| createdAt | DateTime | Auto | Record creation timestamp |
| updatedAt | DateTime | Auto | Last modification timestamp |

### 3.2 Vehicle

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Auto | Primary key |
| customerId | UUID | Yes | FK to Customer |
| year | Integer | Yes | Model year |
| make | String | Yes | e.g. Toyota, Ford |
| model | String | Yes | e.g. Camry, F-150 |
| mileageAtLastService | Integer | No | Odometer at last oil change |

### 3.3 Service Record

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Auto | Primary key |
| vehicleId | UUID | Yes | FK to Vehicle |
| serviceType | Enum | Yes | oil_change (extensible later) |
| serviceDate | Date | Yes | Date service was performed |
| mileageAtService | Integer | No | Odometer reading at service |
| nextDueDate | Date | Auto | Calculated: serviceDate + 3 months |
| nextDueMileage | Integer | Auto | Calculated: mileage + 5000 |
| notes | Text | No | Service-specific notes |

### 3.4 Follow-Up Record

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Auto | Primary key |
| customerId | UUID | Yes | FK to Customer |
| serviceRecordId | UUID | Yes | FK to Service Record triggering follow-up |
| contactDate | DateTime | Yes | When contact was made |
| contactMethod | Enum | Yes | call, text |
| outcome | Enum | Yes | scheduled, not_interested, no_response, serviced_elsewhere |
| notes | Text | No | Conversation notes |
| staffMember | String | No | Who made the contact |

---

## 4. Core Features

### 4.1 Dashboard

The main dashboard provides a single view of all customers requiring follow-up, organized by urgency.

#### 4.1.1 Status Categories

| Status | Condition | Color Code | Priority |
|--------|-----------|------------|----------|
| Overdue | Past due date by 14+ days | Red | High — Contact immediately |
| Due Now | Within 14 days of due date | Orange | Medium — Contact this week |
| Due Soon | 15–30 days before due date | Yellow | Low — Queue for outreach |
| Up to Date | More than 30 days until due | Green | None — No action needed |

#### 4.1.2 Dashboard Filters

- Status filter (Overdue / Due Now / Due Soon / All)
- Date range filter
- Search by customer name or phone
- Sort by due date, last contact date, or customer name

### 4.2 Oil Change Due Logic

The system calculates when each customer is next due for an oil change based on two criteria:

**Time-Based Rule:**
- Default interval: 3 months from last service date
- Configurable per-customer if needed (e.g., 6 months for synthetic oil)

**Mileage-Based Rule (when mileage data available):**
- Default interval: 5,000 miles from last recorded mileage
- Whichever threshold is reached first triggers the due status

**Exclusion Rules:**
- Customers marked as "inactive" or "declined" are excluded from follow-up queues
- Customers with a recent follow-up outcome of "scheduled" are excluded until appointment date passes
- Customers with outcome "serviced_elsewhere" are excluded for 3 months

### 4.3 Follow-Up Workflow

When a customer reaches "Due Soon" status, the following workflow begins:

1. Customer appears in the dashboard under the appropriate status category
2. Staff member selects the customer and initiates outreach (call or text)
3. Staff logs the contact: method, outcome, and any notes
4. System updates the customer record based on outcome
5. If outcome is "no_response", customer stays in queue for follow-up retry (max 3 attempts)
6. If outcome is "scheduled", customer moves to "Up to Date" until next cycle

### 4.4 CSV Import

The system must support bulk import of existing customer and service data from CSV files.

**Required CSV columns:**
- first_name, last_name, phone
- vehicle_year, vehicle_make, vehicle_model
- last_oil_change_date
- mileage_at_service (optional)

**Import behavior:**
- Duplicate detection by phone number
- Validation errors reported per row
- Preview before committing import

---

## 5. User Interface

### 5.1 Pages

| Page | Purpose | Key Actions |
|------|---------|-------------|
| Dashboard | Main view of follow-up queue | Filter, sort, select customer, log follow-up |
| Customer Detail | Full customer profile | View/edit info, see history, log follow-up |
| Import | Bulk data import | Upload CSV, preview, confirm |
| Settings | System configuration | Set intervals, manage staff list |

### 5.2 Key User Flows

#### 5.2.1 Daily Follow-Up Workflow

1. Staff opens dashboard, filtered to "Overdue" + "Due Now"
2. Selects first customer in the list
3. Reviews customer info and last contact history
4. Makes call or sends text
5. Logs outcome in follow-up form
6. Moves to next customer

#### 5.2.2 New Customer Import

1. Navigate to Import page
2. Upload CSV file
3. Review validation results and preview
4. Confirm import
5. Verify imported records in dashboard

---

## 6. Technical Architecture

### 6.1 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 (App Router) | Full-stack React framework with API routes |
| Language | TypeScript | Type safety, better DX, fewer runtime errors |
| Styling | Tailwind CSS | Rapid UI development, consistent design |
| Authentication | Clerk | Multi-tenant auth with minimal setup |
| Database | PostgreSQL (via Supabase or Neon) | Relational data, strong querying |
| ORM | Prisma | Type-safe database queries, migrations |
| Deployment | Vercel | Seamless Next.js deployment |
| SMS (Phase 2) | Twilio | Programmable SMS for automated reminders |

### 6.2 Project Structure

Standard Next.js 14 App Router structure with feature-based organization:

- `src/app/` — Pages and API routes
- `src/components/` — Reusable UI components
- `src/lib/` — Utilities, database client, business logic
- `src/types/` — TypeScript type definitions
- `prisma/` — Database schema and migrations

### 6.3 Multi-Tenancy

The system uses Clerk organization-based multi-tenancy. Each shop is an organization, and all data queries are scoped by organizationId to ensure data isolation between shops.

---

## 7. Implementation Phases

### Phase 1: MVP (Weeks 1–4)

- Database schema and Prisma setup
- Customer CRUD operations
- Vehicle and service record management
- Due date calculation engine
- Dashboard with status filters
- Follow-up logging
- CSV import
- Basic authentication with Clerk

### Phase 2: Communication (Weeks 5–8)

- Twilio SMS integration
- Automated reminder sending
- Message templates
- Outreach analytics and reporting
- Appointment scheduling basic flow

### Phase 3: Scale (Weeks 9–12)

- Multi-location support
- Additional service types
- Customer self-service portal
- Advanced reporting and analytics
- API for third-party integrations

---

## 8. Acceptance Criteria

### 8.1 MVP Acceptance

- Can import customer data from CSV with validation
- Dashboard displays customers sorted by due date urgency
- Due date calculation correctly applies 3-month rule
- Staff can log follow-up contacts with outcome tracking
- No duplicate follow-ups for the same service cycle
- Customer status correctly updates based on follow-up outcomes
- Data is properly isolated between organizations

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data quality from CSV imports | High | Validation layer with error reporting per row |
| Phone number formatting inconsistencies | Medium | Normalize to E.164 format on import |
| Staff adoption resistance | Medium | Simple UI, minimal clicks to log follow-up |
| Feature creep beyond MVP | High | Strict phase boundaries, PRD sign-off |
| Missing mileage data | Low | Time-based rule works independently as fallback |

---

## 10. Glossary

| Term | Definition |
|------|-----------|
| Due Soon | Customer is 15–30 days before their calculated next oil change due date |
| Due Now | Customer is within 14 days of or on their due date |
| Overdue | Customer is 14+ days past their due date without a completed follow-up |
| Follow-Up | A logged outreach attempt to a customer via call or text |
| Service Record | A record of a completed oil change service |
| Outcome | The result of a follow-up attempt (scheduled, not_interested, no_response, serviced_elsewhere) |
