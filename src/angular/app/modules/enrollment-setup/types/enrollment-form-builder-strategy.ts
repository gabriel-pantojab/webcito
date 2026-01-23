import { FormGroup } from '@angular/forms';

import { UseCase } from '@core/types/use-case';

export type EnrollmentFormBuilderStrategy = UseCase<void, FormGroup>;
