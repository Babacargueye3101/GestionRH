export interface Conge {
    id: number; // Un identifiant unique pour le congé
    employee_id: number; // L'ID de l'employé
    start_date: Date; // La date de début du congé
    end_date: Date; // La date de fin du congé
    days_taken: number; // Le nombre de jours pris
    leave_type: string; // Le type de congé (ex: paid, unpaid, etc.)
    reason: string; // La raison du congé
    status: string; // Le statut du congé (ex: pending, approved, rejected)
    date_taken?: Date; // La date à laquelle la demande a été effectuée
}
