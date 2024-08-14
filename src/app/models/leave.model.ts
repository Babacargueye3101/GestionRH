// leave.model.ts
export interface Leave {
    id: number;
    employee_id: number;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
    days_taken: number;
    comments: string | null;
    created_at: string;
    updated_at: string;
    full_name: string | null;
}
